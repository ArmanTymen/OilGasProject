import { createContext, useContext } from 'react';

interface SocketContextValue {
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ connected: false });

export const useSocketStatus = () => useContext(SocketContext);
