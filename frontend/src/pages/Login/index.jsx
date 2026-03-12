import { Link } from "react-router-dom";
import styles from "./styles/index.module.css";
import { PasswordIconView } from "../../components/PasswordIconView";
import { PasswordIconHide } from "../../components/PasswordIconHide";
import { useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Войдите в свой аккаунт</p>

        <form className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="login-email" className={styles.label}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              className={styles.input}
              placeholder="example@mail.com"
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>
              Пароль
            </label>
            <div className={styles.inputWrap}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.input}
                autoComplete="current-password"
                required
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
            Войти
          </button>
        </form>

        <p className={styles.footer}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
