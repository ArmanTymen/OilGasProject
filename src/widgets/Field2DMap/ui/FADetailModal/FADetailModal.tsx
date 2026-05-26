import { Box } from '@mui/material';

export const FADetailModal = () => {
  return (
    <Box
      sx={{
        border: '2px solid #1976d2',
        borderRadius: '12px',
        padding: '32px',
        marginTop: '24px',
        backgroundColor: '#f8faff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        marginX: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* SVG-схема фонтанной арматуры */}
      <svg viewBox="0 0 400 400" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        {/* Центральный ствол (вертикальная линия) */}
        <line x1="200" y1="50" x2="200" y2="350" stroke="#333" strokeWidth="6" />

        {/* Левая задвижка (горизонтальная линия) */}
        <line x1="100" y1="150" x2="200" y2="150" stroke="#333" strokeWidth="6" />
        {/* Левая ручка задвижки (круг) */}
        <circle cx="100" cy="150" r="15" fill="#e0e0e0" stroke="#333" strokeWidth="3" />

        {/* Правая задвижка (горизонтальная линия) */}
        <line x1="200" y1="250" x2="300" y2="250" stroke="#333" strokeWidth="6" />
        {/* Правая ручка задвижки (круг) */}
        <circle cx="300" cy="250" r="15" fill="#e0e0e0" stroke="#333" strokeWidth="3" />

        {/* Манометр 1 (слева сверху) */}
        <circle cx="140" cy="80" r="25" fill="#ffffff" stroke="#333" strokeWidth="3" />
        <line x1="140" y1="105" x2="140" y2="130" stroke="#333" strokeWidth="3" />
        {/* Шкала манометра (простая полоска) */}
        <line x1="120" y1="80" x2="160" y2="80" stroke="red" strokeWidth="4" />

        {/* Манометр 2 (справа сверху) */}
        <circle cx="260" cy="80" r="25" fill="#ffffff" stroke="#333" strokeWidth="3" />
        <line x1="260" y1="105" x2="260" y2="130" stroke="#333" strokeWidth="3" />
        {/* Шкала манометра */}
        <line x1="240" y1="80" x2="280" y2="80" stroke="red" strokeWidth="4" />
      </svg>
    </Box>
  );
};
