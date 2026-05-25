import { ProductionChart } from '@/widgets/Chart';
import s from './ChartPage.module.css';

const ChartPage = () => {
  return (
    <section className={s.pageWrapper}>
      <header className={s.pageHeader}>
        <h1 className={s.title}>Аналитика добычи в реальном времени</h1>
        <p className={s.subtitle}>Данные обновляются автоматически каждые 10 секунд</p>
      </header>

      <div className={s.content}>
        <ProductionChart />
      </div>
    </section>
  );
};

export default ChartPage;
