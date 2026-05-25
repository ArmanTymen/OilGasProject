import { AlertsSidebar } from '@/widgets/AlertsSidebar';
import s from './HomePage.module.css';
import { DashboardCards } from '@/widgets/DashboardCards';
import { MainChart } from '@/widgets/MainChart';

const HomePage = () => {
  return (
    <main className={s.root}>
      <header className={s.hero}>
        <h1>Мониторинг месторождений</h1>
        <p>Оперативная сводка по состоянию фонда скважин</p>
      </header>
      <DashboardCards />

      <div className={s.contentLayout}>
        <MainChart />
        <AlertsSidebar />
      </div>
    </main>
  );
};

export default HomePage;
