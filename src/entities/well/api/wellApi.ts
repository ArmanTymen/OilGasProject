import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IDrillingDelta, IDrillingWell, ProductionAnalytics, WellData } from '../model/types';
import { socketClient } from './socketClient';

let lastExecution = 0;
const FIVE_MINUTES = 5 * 60 * 1000;

const calculateProduction = (fields: WellData[]): ProductionAnalytics => {
  const actual = fields.reduce(
    (acc, field) =>
      acc +
      field.clusters.reduce(
        (cAcc, cluster) => cAcc + cluster.wells.reduce((wAcc, well) => wAcc + well.debit, 0),
        0,
      ),
    0,
  );

  return {
    totalActual: Number(actual.toFixed(2)),
    totalPlan: 65500,
  };
};

export const wellApi = createApi({
  reducerPath: 'wellApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getWellStream: builder.query<WellData[], void>({
      query: () => `/fields`,
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const handleFieldsUpdate = (updateFields: WellData[]) => {
            updateCachedData((draft) => {
              updateFields.forEach((updateField) => {
                const idx = draft.findIndex((f) => f.id === updateField.id);
                if (idx !== -1) draft[idx] = updateField;
              });
            });
          };

          socketClient.on('fields:update', handleFieldsUpdate);

          await cacheEntryRemoved;
          socketClient.off('fields:update', handleFieldsUpdate);
        } catch (error) {
          console.error('WebSocket fields error:', error);
        }
      },
    }),

    getAnalytics: builder.query<ProductionAnalytics, void>({
      query: () => '/fields',
      transformResponse: (response: WellData[]) => calculateProduction(response),
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const handleAnalyticsUpdate = (updateFields: WellData[]) => {
            const now = Date.now();
            if (now - lastExecution > FIVE_MINUTES) {
              updateCachedData((draft) => {
                const result = calculateProduction(updateFields);
                draft.totalActual = result.totalActual;
                lastExecution = now;
              });
            }
          };

          socketClient.on('fields:update', handleAnalyticsUpdate);

          await cacheEntryRemoved;
          socketClient.off('fields:update', handleAnalyticsUpdate);
        } catch (error) {
          console.error('WebSocket analytics error:', error);
        }
      },
    }),

    getDrillingStream: builder.query<IDrillingWell[], void>({
      query: () => '/drilling',
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const handleDrillingUpdate = (deltas: IDrillingDelta[]) => {
            updateCachedData((draft) => {
              deltas.forEach((delta) => {
                const well = draft.find((w) => w.id === delta.id);
                if (well) {
                  well.currentDepth = delta.currentDepth;
                  well.bottomHoleCoord = delta.bottomHoleCoord;
                  well.rop = delta.rop;
                  well.pumpPressure = delta.pumpPressure;
                  well.torque = delta.torque;
                }
              });
            });
          };

          socketClient.on('drilling:update', handleDrillingUpdate);

          await cacheEntryRemoved;
          socketClient.off('drilling:update', handleDrillingUpdate);
        } catch (error) {
          console.error('WebSocket drilling error:', error);
        }
      },
    }),
  }),
});

export const { useGetWellStreamQuery, useGetAnalyticsQuery, useGetDrillingStreamQuery } = wellApi;
