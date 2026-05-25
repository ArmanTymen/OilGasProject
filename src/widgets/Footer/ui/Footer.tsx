import s from './Footer.module.css';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <p>© {new Date().getFullYear()} Мониторинг Добычи. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
