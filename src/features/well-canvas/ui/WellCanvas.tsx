import { useEffect, useRef } from 'react';
import s from './WellCanvas.module.css';

interface WellCanvasProps {
  depth: number;
  targetDepth: number;
  status: string;
}

export const WellCanvas = ({ depth, targetDepth, status }: WellCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    const margin = 50;
    const topY = margin;
    const bottomY = height - margin;
    const wellX = width / 2;

    ctx.beginPath();
    ctx.moveTo(wellX, topY);
    ctx.lineTo(wellX, bottomY);
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 4;
    ctx.stroke();

    let bitColor: string;
    switch (status) {
      case 'бурение':
        bitColor = '#00ff66';
        break;
      case 'спо':
        bitColor = '#ffcc00';
        break;
      case 'промывка':
        bitColor = '#3399ff';
        break;
      case 'простой':
        bitColor = '#888888';
        break;
      default:
        bitColor = '#ff6600';
    }

    ctx.beginPath();
    ctx.arc(wellX, bottomY, 12, 0, 2 * Math.PI);
    ctx.fillStyle = bitColor;
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Долото', wellX - 70, bottomY - 10);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#00ff66';
    ctx.fillText(`${depth.toFixed(0)} м`, wellX - 70, bottomY + 20);

    ctx.fillStyle = '#fff';
    ctx.fillText(`Цель: ${targetDepth.toFixed(0)} м`, wellX - 70, topY - 10);
  }, [depth, targetDepth, status]);

  return <canvas ref={canvasRef} className={s.canvas} />;
};
