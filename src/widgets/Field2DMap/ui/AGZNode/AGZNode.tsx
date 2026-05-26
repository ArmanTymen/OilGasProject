import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';

export interface AGZNodeData extends Record<string, unknown> {
  temperature?: string;
  flowRate?: string;
}

type AGZNodeProps = NodeProps<Node<AGZNodeData>>;

const PORT_Y_COORDINATES: number[] = [30, 50, 70, 90, 110, 130];

export const AGZNode: React.FC<AGZNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        width: '300px',
        height: '160px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Графическое представление АГЗУ через точный SVG */}
      <svg width="300" height="160" viewBox="0 0 300 160" style={{ overflow: 'visible' }}>
        {/* 1. Монтажные проушины (петли) по углам */}
        {/* Топ-лево */}
        <circle cx="65" cy="25" r="7" fill="#1a5cb8" stroke="#113875" strokeWidth="1.5" />
        <circle cx="65" cy="25" r="3" fill="#ffffff" />
        {/* Топ-право */}
        <circle cx="235" cy="25" r="7" fill="#1a5cb8" stroke="#113875" strokeWidth="1.5" />
        <circle cx="235" cy="25" r="3" fill="#ffffff" />
        {/* Боттом-лево */}
        <circle cx="65" cy="135" r="7" fill="#1a5cb8" stroke="#113875" strokeWidth="1.5" />
        <circle cx="65" cy="135" r="3" fill="#ffffff" />
        {/* Боттом-право */}
        <circle cx="235" cy="135" r="7" fill="#1a5cb8" stroke="#113875" strokeWidth="1.5" />
        <circle cx="235" cy="135" r="3" fill="#ffffff" />

        {/* 2. Левый выносной блок управления/питания */}
        <rect
          x="52"
          y="75"
          width="13"
          height="10"
          fill="#1a5cb8"
          stroke="#113875"
          strokeWidth="1.5"
        />
        <rect
          x="22"
          y="55"
          width="30"
          height="50"
          rx="4"
          fill="#52525b"
          stroke="#27272a"
          strokeWidth="2"
        />
        {/* Болты на блоке управления */}
        <circle cx="26" cy="59" r="1.5" fill="#27272a" />
        <circle cx="48" cy="59" r="1.5" fill="#27272a" />
        <circle cx="26" cy="101" r="1.5" fill="#27272a" />
        <circle cx="48" cy="101" r="1.5" fill="#27272a" />

        {/* 3. Петли/пробки на левом торце основного корпуса */}
        <rect
          x="59"
          y="45"
          width="6"
          height="10"
          rx="1"
          fill="#9ca3af"
          stroke="#4b5563"
          strokeWidth="1"
        />
        <rect
          x="59"
          y="105"
          width="6"
          height="10"
          rx="1"
          fill="#9ca3af"
          stroke="#4b5563"
          strokeWidth="1"
        />

        {/* 4. Основной корпус АГЗУ */}
        <rect
          x="65"
          y="25"
          width="170"
          height="110"
          rx="14"
          fill="#1a5cb8"
          stroke="#113875"
          strokeWidth="2.5"
        />
        {/* Внутренний декоративный контур */}
        <rect
          x="69"
          y="29"
          width="162"
          height="102"
          rx="10"
          fill="none"
          stroke="#113875"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* 5. Центральная табличка с надписью */}
        <rect
          x="120"
          y="55"
          width="60"
          height="50"
          rx="6"
          fill="#174ea6"
          stroke="#0f3470"
          strokeWidth="1.5"
        />
        {/* Заклепки таблицы */}
        <circle cx="124" cy="59" r="1.2" fill="#0f3470" />
        <circle cx="176" cy="59" r="1.2" fill="#0f3470" />
        <circle cx="124" cy="101" r="1.2" fill="#0f3470" />
        <circle cx="176" cy="101" r="1.2" fill="#0f3470" />
        {/* Текст */}
        <text
          x="150"
          y="85"
          textAnchor="middle"
          fill="#ffffff"
          fontWeight="bold"
          fontSize="14"
          fontFamily="sans-serif"
        >
          АГЗУ
        </text>

        {/* 6. Манифольд на правом торце (6 выходов с кранами) */}
        {PORT_Y_COORDINATES.map((y: number, index: number) => (
          <g key={`manifold-pipe-${index}`}>
            {/* Отвод трубы из корпуса */}
            <rect
              x="235"
              y={y - 3}
              width="12"
              height="6"
              fill="#1a5cb8"
              stroke="#113875"
              strokeWidth="1"
            />
            {/* Муфта / штуцер (серый металлик) */}
            <rect
              x="247"
              y={y - 5}
              width="8"
              height="10"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="1"
            />
            {/* Корпус шарового крана */}
            <circle cx="259" cy={y} r="4.5" fill="#4b5563" stroke="#1f2937" strokeWidth="1" />
            {/* Поворотная ручка крана (красная бабочка/рычаг) */}
            <path
              d={`M 259 ${y} L 271 ${y}`}
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="271" cy={y} r="2" fill="#ef4444" />
            <path d={`M 259 ${y - 4} L 259 ${y + 4}`} stroke="#ef4444" strokeWidth="1.5" />
          </g>
        ))}
      </svg>

      {/* 7. Интеграция точек подключения (Handles) React Flow */}
      {PORT_Y_COORDINATES.map((y: number, index: number) => (
        <Handle
          key={`handle-source-${index}`}
          type="source"
          position={Position.Right}
          id={`source-${index}`}
          style={{
            top: `${y}px`,
            right: '25px', // Точное позиционирование на конце красных вентилей кранов
            background: '#ef4444',
            width: '8px',
            height: '8px',
            border: '1px solid #ffffff',
            borderRadius: '50%',
          }}
        />
      ))}

      {/* 8. Нижняя технологическая плашка с параметрами (опционально, вынесена вниз для сохранения чистоты графики) */}
      {data.temperature || data.flowRate ? (
        <div
          style={{
            position: 'absolute',
            bottom: '-45px',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #b4d3fe',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap',
            fontFamily: 'monospace',
            color: '#1e3a8a',
          }}
        >
          {data.temperature && <div>T: {data.temperature}</div>}
          {data.flowRate && <div>Q: {data.flowRate}</div>}
        </div>
      ) : null}
    </div>
  );
};
