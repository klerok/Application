import { Link } from "react-router-dom";
import styles from "../styles/index.module.css";

export function SupportAuthGate() {
  return (
    <section className={styles.root}>
      <div className={styles.authGate}>
        <h1 className={styles.authTitle}>Поддержка</h1>
        <p className={styles.authText}>
          Войдите в аккаунт, чтобы создавать обращения и переписываться с
          поддержкой.
        </p>
        <Link to="/login" className={styles.authLink}>
          Войти
        </Link>
      </div>
    </section>
  );
}
