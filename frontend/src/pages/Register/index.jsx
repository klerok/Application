import { useState } from "react";
import "./style.css";

export function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMessage("Пожалуйста, заполните все поля.");
      return;
    }

    console.log("Форма регистрации:", form);
    setMessage("Регистрация прошла успешно (демо).");
  };

  return (
    <div className="register-page">
      <header className="header">
        <div className="header__logo">Мой сайт</div>
        <nav className="header__nav">
          <span className="header__nav-item header__nav-item--active">
            Регистрация
          </span>
        </nav>
      </header>

      <main className="auth">
        <h1 className="auth__title">Регистрация</h1>
        <p className="auth__subtitle">
          Заполните форму, чтобы создать аккаунт.
        </p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__field">
            <span>Имя</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
            />
          </label>

          <label className="auth__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label className="auth__field">
            <span>Пароль</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
            />
          </label>

          <button type="submit" className="auth__button">
            Зарегистрироваться
          </button>

          {message && <p className="auth__message">{message}</p>}
        </form>
      </main>
    </div>
  );
}
