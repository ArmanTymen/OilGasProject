import { NavBar } from "@/widgets/Navbar";
import s from "./Header.module.css";

function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}> 
        <NavBar />
        <h1 className={s.title}>Мониторинг добычи</h1>
      </div>
    </header>
  );
}

export default Header