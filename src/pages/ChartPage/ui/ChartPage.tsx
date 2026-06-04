import { useState } from 'react';
import s from './ChartPage.module.css';
import { ProductionChart } from '@/widgets/Chart/ui/ProductionChart';
import { FieldProductionChart } from '@/widgets/Chart/ui/FieldProductionChart';
import { WellParametersChart } from '@/widgets/Chart/ui/WellParametersChart/ui/WellParametersChart';

type ChartType = 'production' | 'field' | 'well';

export const ChartPage = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('production');

  return (
    <section className={s.pageWrapper}>
      <header className={s.pageHeader}>
        <h1 className={s.title}>Производственные показатели</h1>
        <p className={s.subtitle}>Данные обновляются автоматически каждые 5 секунд</p>
        <div className={s.tabs}>
          <button
            className={`${s.tabBtn} ${activeChart === 'production' ? s.activeTab : ''}`}
            onClick={() => setActiveChart('production')}
          >
            Динамика добычи
          </button>
          <button
            className={`${s.tabBtn} ${activeChart === 'field' ? s.activeTab : ''}`}
            onClick={() => setActiveChart('field')}
          >
            Добыча по месторождениям
          </button>
          <button
            className={`${s.tabBtn} ${activeChart === 'well' ? s.activeTab : ''}`}
            onClick={() => setActiveChart('well')}
          >
            Параметры бурения
          </button>
        </div>
      </header>
      <div className={s.content}>
        {activeChart === 'production' && <ProductionChart />}
        {activeChart === 'field' && <FieldProductionChart />}
        {activeChart === 'well' && <WellParametersChart />}
      </div>
    </section>
  );
};
