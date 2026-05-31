import { useState, useEffect, useCallback, type JSX } from 'react';
import { Truck } from '@/entities/surface/Truck/ui/Truck';
import { Worker } from '@/entities/surface/Worker/ui/Worker';
import { DIALOG_SEQUENCE } from '../lib/SceneDirectorText';

interface SceneDirectorProps {
  truckTrigger?: number;
}

export const SceneDirector = ({ truckTrigger = 0 }: SceneDirectorProps): JSX.Element => {
  const [isSequenceStarted, setIsSequenceStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [prevTrigger, setPrevTrigger] = useState<number>(truckTrigger);

  if (truckTrigger !== prevTrigger) {
    setPrevTrigger(truckTrigger);
    setIsSequenceStarted(false);
    setCurrentStep(0);
  }

  const handleTruckArrive = useCallback(() => {
    setIsSequenceStarted(true);
  }, []);

  useEffect(() => {
    if (!isSequenceStarted) return;
    if (currentStep >= DIALOG_SEQUENCE.length) return;

    const currentLine = DIALOG_SEQUENCE[currentStep];

    const timer = setTimeout(() => {
      setCurrentStep((prev: number) => prev + 1);
    }, currentLine.duration);

    return () => clearTimeout(timer);
  }, [isSequenceStarted, currentStep]);

  const isSequenceActive = isSequenceStarted && currentStep < DIALOG_SEQUENCE.length;
  const activeLine = isSequenceActive ? DIALOG_SEQUENCE[currentStep] : null;

  const truckMessage = activeLine?.speaker === 'truck' ? activeLine.text : null;
  const workerMessage = activeLine?.speaker === 'worker' ? activeLine.text : null;

  return (
    <>
      <Truck runTrigger={truckTrigger} onArrive={handleTruckArrive} message={truckMessage} />
      <Worker message={workerMessage} position={[15, 4, -2]} />
    </>
  );
};
