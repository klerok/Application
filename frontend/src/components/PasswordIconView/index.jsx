import styles from "./styles/index.module.css";

export function PasswordIconView() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={styles.icon}
    >
      <path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
