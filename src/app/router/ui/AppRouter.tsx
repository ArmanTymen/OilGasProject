import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from '@/widgets/Layout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const TablePage = lazy(() => import('@/pages/TablePage'));
const ChartPage = lazy(() => import('@/pages/ChartPage'));
const Model2DMap = lazy(() => import('@/pages/Model2DMap'));
const Model3D = lazy(() => import('@/pages/Model3DPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="table" element={<TablePage />} />
          <Route path="analytics" element={<ChartPage />} />
          <Route path="field-map" element={<Model2DMap />} />
          <Route path="model/:wellId" element={<Model3D />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
