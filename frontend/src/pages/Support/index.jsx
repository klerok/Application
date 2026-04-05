import { useEffect, useRef, useState } from "react";
import styles from "./styles/index.module.css";

function formatTime() {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const initialMessages = [
  {
    id: "welcome",
    role: "support",
    text: "Здравствуйте! Вы в чате поддержки BookPoint. Чем можем помочь?",
    timeLabel: "Сейчас",
  },
];

export function SupportPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text,
        timeLabel: formatTime(),
      },
    ]);
    setDraft("");
  }

  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Support chat</h1>
          <p className={styles.subtitle}>
            Заказы, доставка, аккаунт — напишите, и мы ответим в рабочее время.
          </p>
        </header>

        <div className={styles.chatCard}>
          <div className={styles.chatToolbar}>
            <div className={styles.chatToolbarInfo}>
              <span className={styles.chatAvatar} aria-hidden>
                BP
              </span>
              <div>
                <p className={styles.chatName}>BookPoint Support</p>
                <p className={styles.chatStatus}>
                  Обычно отвечаем в течение нескольких часов
                </p>
              </div>
            </div>
            <span className={styles.badge}>Demo</span>
          </div>

          <div
            ref={messagesContainerRef}
            className={styles.messages}
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.role === "user" ? styles.rowUser : styles.rowSupport}
              >
                <div
                  className={
                    msg.role === "user" ? styles.bubbleUser : styles.bubbleSupport
                  }
                >
                  <p className={styles.bubbleText}>{msg.text}</p>
                  <span className={styles.bubbleTime}>{msg.timeLabel}</span>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <label htmlFor="support-message" className={styles.visuallyHidden}>
              Сообщение
            </label>
            <textarea
              id="support-message"
              className={styles.textarea}
              placeholder="Введите сообщение…"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button type="submit" className={styles.sendButton}>
              Отправить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
