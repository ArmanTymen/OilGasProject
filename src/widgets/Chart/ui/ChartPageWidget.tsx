import s from './ChartPageWidget.module.css';
import { FieldProductionChart } from './FieldProductionChart/FieldProductionChart';
import { ProductionChart } from './ProductionChart/ui/ProductionChart';

export const ChartPageWidget = (): React.JSX.Element => {
  return (
    <section className={s.pageWrapper}>
      <header className={s.pageHeader}>
        <h1 className={s.title}>Производственные показатели</h1>
        <p className={s.subtitle}>Данные обновляются автоматически каждые 10 секунд</p>
      </header>
      <div className={s.content}>
        <ProductionChart />
        <FieldProductionChart />
      </div>
    </section>
  );
};
