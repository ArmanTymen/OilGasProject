import { useState, useEffect, type JSX } from 'react';
import { Truck } from './Truck';
import { Worker } from './Worker';
import { DIALOG_SEQUENCE } from './SceneDirectorText';

interface SceneDirectorProps {
  truckTrigger?: number;
}

export const SceneDirector = ({ truckTrigger = 0 }: SceneDirectorProps): JSX.Element => {
  const [isSequenceStarted, setIsSequenceStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleTruckArrive = () => {
    if (!isSequenceStarted) {
      setIsSequenceStarted(true);
    }
  };

  useEffect(() => {
    if (!isSequenceStarted) return;
    if (currentStep >= DIALOG_SEQUENCE.length) return;

    const currentLine = DIALOG_SEQUENCE[currentStep];

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, currentLine.duration);

    return () => clearTimeout(timer);
  }, [isSequenceStarted, currentStep]);

  const activeLine = isSequenceStarted ? DIALOG_SEQUENCE[currentStep] : null;
  const truckMessage = activeLine?.speaker === 'truck' ? activeLine.text : null;
  const workerMessage = activeLine?.speaker === 'worker' ? activeLine.text : null;

  return (
    <>
      <Truck runTrigger={truckTrigger} onArrive={handleTruckArrive} message={truckMessage} />
      <Worker message={workerMessage} position={[15, 4, -2]} />
    </>
  );
};
