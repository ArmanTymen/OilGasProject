import { DashboardCards } from '@/widgets/DashboardCards';
import { TopWellsTable } from '@/widgets/TopWellsTable';
import { AlertsSidebar } from '@/widgets/AlertsSidebar';
import s from './HomePageWidget.module.css';

export const HomePageWidget = () => {
  return (
    <main className={s.root}>
      <header className={s.hero}>
        <h1>Оперативная сводка по состоянию фонда скважин</h1>
      </header>
      <DashboardCards />
      <div className={s.contentLayout}>
        <TopWellsTable />
        <AlertsSidebar />
      </div>
    </main>
  );
};
