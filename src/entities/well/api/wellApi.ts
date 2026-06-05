import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IDrillingDelta, IDrillingWell, WellData } from '../model/types';
import { socketClient } from './socketClient';
import { API_BASE_URL } from '@/shared/config/api';

export const wellApi = createApi({
  reducerPath: 'wellApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
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

export const { useGetWellStreamQuery, useGetDrillingStreamQuery } = wellApi;
