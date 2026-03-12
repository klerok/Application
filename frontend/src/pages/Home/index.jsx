import { Link } from 'react-router-dom'
import styles from './styles/index.module.css'

export function HomePage() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <p className={styles.text}>
        Это главная страница приложения. Здесь будет контент после подключения логики.
      </p>
      <div className={styles.actions}>
        <Link to="/login" className={styles.link}>Войти</Link>
        <Link to="/register" className={`${styles.link} ${styles.linkPrimary}`}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}
