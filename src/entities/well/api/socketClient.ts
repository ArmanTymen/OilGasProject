import { API_BASE_URL } from '@/shared/config/api';
import { io, Socket } from 'socket.io-client';

export const socketClient: Socket = io(API_BASE_URL, {
  autoConnect: true,
});
