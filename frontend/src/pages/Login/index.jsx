import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/index.module.css";
import { PasswordIconView } from "../../components/PasswordIconView";
import { PasswordIconHide } from "../../components/PasswordIconHide";
import { useState } from "react";
import { AuthForm } from "../../modules/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await loginUser(email, password)
      alert('Login successful! You are now logged in.')
      navigate('/')
    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className={styles.root}>
      <AuthForm title="Вход" subtitle="Войдите в свой аккаунт">
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((prev) => !prev)}
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
      </AuthForm>
    </div>
  );
}
