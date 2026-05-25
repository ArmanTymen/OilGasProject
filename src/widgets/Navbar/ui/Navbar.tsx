import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

function NavBar() {
  // В будущем сюда можно прокинуть ID выбранной скважины из стора
  const selectedWellId = 1;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.link} ${s.activeLink}` : s.link;

  return (
    <nav className={s.nav}>
      <NavLink title="На главную" to="/" className={getLinkClass}>
        Главная
      </NavLink>
      <NavLink title="Таблица скважин" to="/table" className={getLinkClass}>
        Таблица
      </NavLink>
      <NavLink title="Аналитические графики" to="/analytics" className={getLinkClass}>
        График
      </NavLink>

      {/* Исправленный путь: подставляем реальный ID или не рендерим ссылку */}
      <NavLink title="3D Визуализация" to={`/model/${selectedWellId}`} className={getLinkClass}>
        3D Модель
      </NavLink>

      <NavLink title="Карта месторождения" to="/field-map" className={getLinkClass}>
        2D Модель
      </NavLink>
    </nav>
  );
}

export default NavBar;
