import { Link } from 'react-router-dom'
import styles from './styles/index.module.css'

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Education App
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Главная
          </Link>
          <Link to="/login" className={styles.link}>
            Вход
          </Link>
          <Link to="/register" className={`${styles.link} ${styles.linkAccent}`}>
            Регистрация
          </Link>
        </nav>
      </div>
    </header>
  )
}
