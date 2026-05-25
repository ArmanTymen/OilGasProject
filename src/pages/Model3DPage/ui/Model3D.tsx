import { WellVisualizer } from '@/widgets/3DModel';
import s from './Model3D.module.css';

const Model3D = () => {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Визуализация скважины 3D</h1>
        <div className={s.badge}>Live Mode</div>
      </header>

      <section className={s.canvasContainer}>
        {/* Сюда позже вставим виджет с Canvas и WellMesh */}
        <div className={s.placeholder}>
          <WellVisualizer />
          <span>Инициализация WebGL...</span>
        </div>
      </section>
    </div>
  );
};

export default Model3D;
