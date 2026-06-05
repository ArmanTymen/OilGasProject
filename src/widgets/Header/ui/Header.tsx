import { NavBar } from '@/widgets/Navbar';
import s from './Header.module.css';
import { useSocketStore } from '@/entities/well/model/socketStore';

function Header() {
  const connected = useSocketStore((state) => state.connected);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavBar />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 className={s.title}>Мониторинг добычи</h1>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: connected ? '#4caf50' : '#f44336',
              display: 'inline-block',
              border: '1px solid #fff',
            }}
            title={connected ? 'Онлайн' : 'Нет связи'}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
