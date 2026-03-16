import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { useAuth } from "../../../hooks/useAuth";

export function Header() {
  const { isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  function guestLinks() {
    return (
      <>
        <Link to="/" className={styles.link}>
          Главная
        </Link>
        <Link to="/login" className={styles.link}>
          Вход
        </Link>
        <Link to="/register" className={`${styles.link} ${styles.linkAccent}`}>
          Регистрация
        </Link>
      </>
    );
  }

  function userLinks() {
    return (
      <>
        <Link to="/" className={styles.link}>
          Главная
        </Link>
        <button type="button" className={styles.link} onClick={handleLogout}>
          Выйти
        </button>
      </>
    );
  }

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Education App
        </Link>
        <nav className={styles.nav}>
          {isAuthenticated ? userLinks() : guestLinks()}
        </nav>
      </div>
    </header>
  );
}
