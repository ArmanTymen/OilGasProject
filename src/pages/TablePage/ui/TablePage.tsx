import { WellTable } from "@/widgets/Table";
import s from "./TablePage.module.css";

const TablePage = () => {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <h1 className={s.title}>Реестр скважин</h1>
        <p className={s.subtitle}>Полный список объектов мониторинга с текущими показателями</p>
      </header>

      <section className={s.content}>
        <WellTable />
      </section>
    </div>
  );
};

export default TablePage;