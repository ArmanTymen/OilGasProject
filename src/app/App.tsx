import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from './router/ui/AppRouter';
import { useEffect } from 'react';
import { useSocketStore } from '@/entities/well/model/socketStore';
import AppInitializer from './AppInitializer';

function App() {
  const connect = useSocketStore((state) => state.connect);
  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    const run = async (): Promise<void> => {
      try {
        const mod = await import('@/shared/lib/preload3DModels');

        mod.preload3DModels();
      } catch (error) {
        console.error('[Preload] Model preload failed:', error);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(
        () => {
          void run();
        },
        { timeout: 5000 },
      );
    } else {
      setTimeout(() => {
        void run();
      }, 5000);
    }
  }, []);

  return (
    <Provider store={store}>
      <AppInitializer />
      <AppRouter />
    </Provider>
  );
}

export default App;
