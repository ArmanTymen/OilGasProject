import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '64px', margin: '0 0 16px 0', color: '#555' }}>404</h1>
      <h2 style={{ fontSize: '24px', margin: '0 0 24px 0', fontWeight: 'normal' }}>
        Страница не найдена
      </h2>
      <p style={{ marginBottom: '32px', color: '#777' }}>
        Возможно, она была удалена, либо вы ввели неверный адрес.
      </p>

      <Link
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#2196F3',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
};
