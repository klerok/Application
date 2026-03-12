import { Link } from "react-router-dom";
import styles from "./styles/index.module.css";
import { useState } from "react";
import { PasswordIconView } from '../../components/PasswordIconView'
import { PasswordIconHide } from '../../components/PasswordIconHide'

export function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте новый аккаунт</p>

        <form className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="register-username" className={styles.label}>
              Имя пользователя
            </label>
            <input
              id="register-username"
              type="text"
              name="username"
              className={styles.input}
              placeholder="username"
              autoComplete="username"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="register-email" className={styles.label}>
              Email
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              className={styles.input}
              placeholder="example@mail.com"
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="register-password" className={styles.label}>
              Пароль
            </label>
            <div className={styles.inputWrap}>
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.input}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((e) => !e)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <PasswordIconView /> : <PasswordIconHide />}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.submit}>
            Зарегистрироваться
          </button>
        </form>

        <p className={styles.footer}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
