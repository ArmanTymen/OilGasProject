import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import s from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress size={48} />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
