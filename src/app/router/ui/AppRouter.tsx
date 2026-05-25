import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/Layout';
import { HomePage } from '@/pages/HomePage';
import { TablePage } from '@/pages/TablePage';
import { ChartPage } from '@/pages/ChartPage';
import { Model2DMap } from '@/pages/Model2DMap';
import { Model3D } from '@/pages/Model3DPage';

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
          {/* Обработка 404 — можно создать отдельную страницу позже */}
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
