import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header"; 
import { Footer } from "@/widgets/Footer";
import s from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={s.root}>
      <Header />
      
      <main className={s.main}>
        {/* Все страницы внутри Outlet теперь будут центрированы */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};