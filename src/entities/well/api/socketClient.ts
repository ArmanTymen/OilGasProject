import { API_BASE_URL } from '@/shared/config/api';
import { io, Socket } from 'socket.io-client';

export const socketClient: Socket = io(API_BASE_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});

let onStatusChange: ((connected: boolean) => void) | null = null;

export const setSocketStatusListener = (fn: (connected: boolean) => void) => {
  onStatusChange = fn;
  fn(socketClient.connected);
};

socketClient.on('connect', () => {
  onStatusChange?.(true);
});

socketClient.on('disconnect', () => {
  onStatusChange?.(false);
});

export const connectSocket = () => {
  if (!socketClient.connected) {
    socketClient.connect();
  }
};

export const disconnectSocket = () => {
  if (socketClient.connected) {
    socketClient.disconnect();
  }
};
