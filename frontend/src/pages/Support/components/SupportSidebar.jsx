import { formatListDate } from "../supportUtils";
import styles from "../styles/index.module.css";

export function SupportSidebar({ desk }) {
  const {
    canCreateTicket,
    openCreateTicketModal,
    chats,
    chatsLoading,
    chatsError,
    selectedChatId,
    openChat,
    isAgent,
  } = desk;

  return (
    <aside className={styles.sidebar} aria-label="История обращений">
      {canCreateTicket && (
        <button
          type="button"
          className={styles.createRequestBtn}
          onClick={openCreateTicketModal}
        >
          Создать обращение
        </button>
      )}

      <div className={styles.sidebarSection}>
        <h2 className={styles.sidebarHeading}>История обращений</h2>
        {chatsLoading && (
          <p className={styles.sidebarHint}>Загрузка…</p>
        )}
        {chatsError && (
          <p className={styles.sidebarError}>{chatsError}</p>
        )}
        {!chatsLoading && chats.length === 0 && !chatsError && (
          <p className={styles.sidebarHint}>
            {canCreateTicket
              ? "Пока нет обращений. Создайте первое."
              : "Нет открытых обращений."}
          </p>
        )}
        <ul className={styles.historyList}>
          {chats.map((c) => (
            <li key={c.chatId}>
              <button
                type="button"
                className={
                  selectedChatId === c.chatId
                    ? `${styles.historyItem} ${styles.historyItemActive}`
                    : styles.historyItem
                }
                onClick={() => openChat(c.chatId)}
              >
                <span className={styles.historyTitle}>{c.title}</span>
                <span className={styles.historyMeta}>
                  {c.status === "OPEN" ? "Открыто" : "Закрыто"}
                  {isAgent && c.customerUsername
                    ? ` · ${c.customerUsername}`
                    : ""}
                  {c.lastMessageAt
                    ? ` · ${formatListDate(c.lastMessageAt)}`
                    : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.sidebarFootnote}>
        {canCreateTicket
          ? "Блок создания и просмотра обращений"
          : "Список всех открытых обращений; новые появляются в реальном времени"}
      </p>
    </aside>
  );
}
