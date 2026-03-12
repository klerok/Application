import styles from './styles/index.module.css'

/**
 * Модальное окно. Можно размещать в модуле или на странице.
 * onClose вызывается при клике по оверлею или по кнопке закрытия (логика снаружи).
 */
export function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
        {children && <div className={styles.body}>{children}</div>}
      </div>
    </div>
  )
}
