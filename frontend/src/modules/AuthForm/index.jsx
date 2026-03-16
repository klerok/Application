import styles from './styles/index.module.css'

/**
 * Модуль формы авторизации (логин или регистрация).
 * Можно размещать на странице или внутри модального окна.
 * Поля и кнопка задаются через children или пропсы — логика на странице.
 */
export function AuthForm({ title, subtitle, children }) {
  return (
    <div className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  )
}
