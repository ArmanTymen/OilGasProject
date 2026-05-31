import { useState, useEffect, useCallback, type JSX } from 'react';
import { Truck } from '@/entities/surface/Truck/ui/Truck';
import { Worker } from '@/entities/surface/Worker/ui/Worker';
import { DIALOG_SEQUENCE } from '../lib/SceneDirectorText';
import { useSceneDirectorStore } from '../model/useSceneDirectorStore';

export const SceneDirector = (): JSX.Element => {
  const truckTrigger = useSceneDirectorStore((state) => state.truckTrigger);
  const currentRoute = useSceneDirectorStore((state) => state.currentRoute);
  const completeSequence = useSceneDirectorStore((state) => state.completeSequence);
  const startLeaveSequence = useSceneDirectorStore((state) => state.startLeaveSequence);

  const [isSequenceStarted, setIsSequenceStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [prevTrigger, setPrevTrigger] = useState<number>(truckTrigger);

  if (truckTrigger !== prevTrigger) {
    setPrevTrigger(truckTrigger);
    setIsSequenceStarted(false);
    setCurrentStep(0);
  }

  const handleTruckArrive = useCallback(() => {
    if (currentRoute === 'arrival') {
      setIsSequenceStarted(true);
    } else if (currentRoute === 'departure') {
      startLeaveSequence();
    }
  }, [currentRoute, startLeaveSequence]);

  useEffect(() => {
    if (!isSequenceStarted) return;

    if (currentStep >= DIALOG_SEQUENCE.length) {
      completeSequence();
      return;
    }

    const currentLine = DIALOG_SEQUENCE[currentStep];

    const timer = setTimeout(() => {
      setCurrentStep((prev: number) => prev + 1);
    }, currentLine.duration);

    return () => clearTimeout(timer);
  }, [isSequenceStarted, currentStep, completeSequence]);

  const isSequenceActive = isSequenceStarted && currentStep < DIALOG_SEQUENCE.length;
  const activeLine = isSequenceActive ? DIALOG_SEQUENCE[currentStep] : null;

  const truckMessage = activeLine?.speaker === 'truck' ? activeLine.text : null;
  const workerMessage = activeLine?.speaker === 'worker' ? activeLine.text : null;

  return (
    <>
      <Truck
        runTrigger={truckTrigger}
        routeId={currentRoute}
        onArrive={handleTruckArrive}
        message={truckMessage}
      />
      <Worker message={workerMessage} position={[15, 4, -2]} />
    </>
  );
};
