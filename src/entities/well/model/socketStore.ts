import { create } from 'zustand';
import {
  socketClient,
  setSocketStatusListener,
  connectSocket,
  disconnectSocket,
} from '@/entities/well/api/socketClient';

interface SocketStore {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketStore>((set) => {
  setSocketStatusListener((connected) => set({ connected }));

  return {
    connected: socketClient.connected,
    connect: () => connectSocket(),
    disconnect: () => disconnectSocket(),
  };
});
