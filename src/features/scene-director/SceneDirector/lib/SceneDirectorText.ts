import { type CSSProperties } from 'react';

export type DialogLine = {
  speaker: 'truck' | 'worker';
  text: string;
  duration: number;
};

export const DIALOG_SEQUENCE: DialogLine[] = [
  { speaker: 'truck', text: 'Принимай груз, шеф! Привез четко по графику.', duration: 3000 },
  { speaker: 'worker', text: 'Отлично. Ставь на разгрузку у второго терминала.', duration: 3000 },
  { speaker: 'truck', text: 'Понял, глушу мотор.', duration: 2500 },
  { speaker: 'worker', text: 'Как закончишь, зайди в диспетчерскую за путевым.', duration: 3500 },
];

export const bubbleStyle: CSSProperties = {
  background: '#ffffff',
  border: '2px solid #000000',
  borderRadius: '8px',
  padding: '8px 12px',
  fontFamily: 'sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#000',
  width: 'max-content',
  maxWidth: '200px',
  textAlign: 'center',
  position: 'relative',
  boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
  userSelect: 'none',
};

export const tailStyle: CSSProperties = {
  content: '""',
  position: 'absolute',
  bottom: '-10px',
  left: '50%',
  transform: 'translateX(-50%)',
  borderWidth: '10px 10px 0',
  borderStyle: 'solid',
  borderColor: '#000000 transparent transparent transparent',
  display: 'block',
  width: 0,
};

export const tailInnerStyle: CSSProperties = {
  content: '""',
  position: 'absolute',
  bottom: '-7px',
  left: '50%',
  transform: 'translateX(-50%)',
  borderWidth: '8px 8px 0',
  borderStyle: 'solid',
  borderColor: '#ffffff transparent transparent transparent',
  display: 'block',
  width: 0,
};
