import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { DepthData, ProductionAnalytics, WellData } from '../model/types'
import { io, Socket } from 'socket.io-client'

let lastExecution = 0;
const FIVE_MINUTES = 5 * 60 * 1000;

const calculateProduction = (fields: WellData[]): ProductionAnalytics => {
    const actual = fields.reduce((acc, field) => 
        acc + field.clusters.reduce((cAcc, cluster) => 
            cAcc + cluster.wells.reduce((wAcc, well) => wAcc + well.debit, 0), 0), 0);
    
    return {
        totalActual: Number(actual.toFixed(2)),
        totalPlan: 65500
    };
};

export const wellApi = createApi({
    reducerPath: 'wellApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001'}),
    endpoints: (builder) => ({
        getWellStream: builder.query<WellData[], string>({
            query: () => `/fields`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const socket: Socket = io(`http://localhost:3001`)
                try {
                    await cacheDataLoaded;
                    socket.on('fields:update', (updateFields: WellData[]) => {
                        updateCachedData((draft) => {
                            updateFields.forEach(updateField => {
                                const idx = draft.findIndex(f => f.id === updateField.id);
                                if (idx !== -1) draft[idx] = updateField;
                            })
                        })
                    })
                } catch(error) { console.log(error) }
                await cacheEntryRemoved;
                socket.disconnect();
            },
        }),
        getAnalytics: builder.query<ProductionAnalytics, void>({
            query: () => '/fields',
            transformResponse: (response: WellData[]) => calculateProduction(response),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const socket: Socket = io(`http://localhost:3001`);
                try {
                    await cacheDataLoaded;
                    socket.on('fields:update', (updateFields: WellData[]) => {
                    const now = Date.now();
                    // Считаем только если прошло 5 минут
                    if (now - lastExecution > FIVE_MINUTES) {
                        updateCachedData((draft) => {
                            const result = calculateProduction(updateFields);
                            draft.totalActual = result.totalActual;
                            lastExecution = now;
                        });
                    }
                });
                } catch(error) { console.error(error) }
                await cacheEntryRemoved;
                socket.disconnect();
            },
        }),
        getDepthStream: builder.query<DepthData[], void>({
            query: () => `/depths`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                const socket: Socket = io(`http://localhost:3001`);
                try {
                    await cacheDataLoaded;
                    socket.on('depths:update', (updateData: DepthData[]) => {
                        updateCachedData((draft) => {
                            updateData.forEach((u) => {
                                const idx = draft.findIndex(d => d.wellId === u.wellId)
                                if(idx !== -1) draft[idx] = u
                            })
                        })
                    })
                } catch (error) {
                    console.log(error)
                }
                await cacheEntryRemoved;
                socket.disconnect()
            }
        }),
        getWellData: builder.query<WellData[], void>({
            query: () => `/fields`
        })
    }),
});

export const { useGetWellStreamQuery, useGetAnalyticsQuery, useGetDepthStreamQuery, useGetWellDataQuery } = wellApi;