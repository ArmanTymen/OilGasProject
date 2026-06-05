import { useGetWellStreamQuery, useGetDrillingStreamQuery } from '@/entities/well/api/wellApi';

function AppInitializer() {
  useGetWellStreamQuery();
  useGetDrillingStreamQuery();
  return null;
}

export default AppInitializer;
