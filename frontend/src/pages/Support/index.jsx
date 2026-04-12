import { useAuth } from "../../hooks/useAuth";
import { CreateTicketModal } from "./components/CreateTicketModal";
import { SupportAuthGate } from "./components/SupportAuthGate";
import { SupportChatPanel } from "./components/SupportChatPanel";
import { SupportSidebar } from "./components/SupportSidebar";
import styles from "./styles/index.module.css";
import { useSupportDesk } from "../../hooks/useSupportDesk";

export function SupportPage() {
  const { user } = useAuth();
  const desk = useSupportDesk(user);

  if (!user) {
    return <SupportAuthGate />;
  }

  return (
    <section className={styles.root}>
      <div className={styles.shell}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Поддержка</h1>
          <p className={styles.subtitle}>
            {desk.isAgent
              ? "Очередь обращений и переписка с клиентами магазина BookPoint"
              : "Создание обращений и чат с поддержкой магазина BookPoint"}
          </p>
        </header>

        <div className={styles.supportChat}>
          <SupportSidebar desk={desk} />
          <SupportChatPanel desk={desk} />
        </div>
      </div>

      {desk.canCreateTicket && <CreateTicketModal desk={desk} />}
    </section>
  );
}
