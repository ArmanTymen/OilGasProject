import { create } from 'zustand';

export type TruckRoute = 'arrival' | 'departure' | 'leave';

interface SceneDirectorState {
  truckTrigger: number;
  currentRoute: TruckRoute;

  startFirstSequence: () => void;
  completeSequence: () => void;
  startLeaveSequence: () => void;
}

export const useSceneDirectorStore = create<SceneDirectorState>()((set) => ({
  truckTrigger: 0,
  currentRoute: 'arrival',

  startFirstSequence: () =>
    set((state) => ({
      currentRoute: 'arrival',
      truckTrigger: state.truckTrigger + 1,
    })),

  completeSequence: () =>
    set((state) => ({
      currentRoute: 'departure',
      truckTrigger: state.truckTrigger + 1,
    })),

  startLeaveSequence: () =>
    set((state) => ({
      currentRoute: 'leave',
      truckTrigger: state.truckTrigger + 1,
    })),
}));
