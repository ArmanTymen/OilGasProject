import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from './router/ui/AppRouter';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('@/shared/lib/preload3DModels');
      });
    } else {
      setTimeout(() => import('@/shared/lib/preload3DModels'), 3000);
    }
  }, []);

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
