import { Modal } from "../../../components/Modal";
import styles from "../styles/index.module.css";

export function CreateTicketModal({ desk }) {
  const {
    modalOpen,
    setModalOpen,
    ticketTitle,
    setTicketTitle,
    ticketDescription,
    setTicketDescription,
    ticketSubmitting,
    ticketError,
    handleCreateTicket,
  } = desk;

  return (
    <Modal
      open={modalOpen}
      onClose={() => !ticketSubmitting && setModalOpen(false)}
      title="Новое обращение"
    >
      <form className={styles.ticketForm} onSubmit={handleCreateTicket}>
        <label className={styles.fieldLabel} htmlFor="ticket-title">
          Заголовок
        </label>
        <input
          id="ticket-title"
          className={styles.fieldInput}
          value={ticketTitle}
          onChange={(e) => setTicketTitle(e.target.value)}
          placeholder="Кратко опишите проблему"
          maxLength={200}
          disabled={ticketSubmitting}
        />

        <label className={styles.fieldLabel} htmlFor="ticket-desc">
          Описание{" "}
          <span className={styles.optional}>(можно оставить пустым)</span>
        </label>
        <textarea
          id="ticket-desc"
          className={styles.fieldTextarea}
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          placeholder="Подробности, номер заказа, скриншоты — в чате"
          rows={5}
          disabled={ticketSubmitting}
        />

        {ticketError && (
          <p className={styles.ticketError} role="alert">
            {ticketError}
          </p>
        )}

        <div className={styles.ticketActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            disabled={ticketSubmitting}
            onClick={() => setModalOpen(false)}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={ticketSubmitting}
          >
            {ticketSubmitting ? "Отправка…" : "Создать"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
