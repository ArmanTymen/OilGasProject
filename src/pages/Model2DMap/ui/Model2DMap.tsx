import { FieldMap2D } from "@/widgets/Field2DMap";
import s from "./Model2DMap.module.css";

const Model2DMap = () => {
  return (
    <div className={s.page}>
      <header className={s.header}>
        <h1>Карта месторождений 2D</h1>
        <p>Выберите объект для перехода к детальной 3D модели</p>
      </header>

      <section className={s.content}>
        <FieldMap2D />
      </section>
    </div>
  );
};

export default Model2DMap;