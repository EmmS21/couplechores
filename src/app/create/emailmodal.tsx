import styles from "./createhousehold.module.css";

export default function EmailModal({ emails, onClose, onDeleteEmail }: any) {
  return (
    <div className={styles.modalContainer} role="dialog">
      <div className={styles.modalContent}>
        {emails.map((email: string) => (
          <div key={email} className={styles.emailItem}>
            {email}
            <button
              onClick={() => onDeleteEmail(email)}
              className={styles.deleteEmailBtn}
            >
              x
            </button>
          </div>
        ))}
        <button onClick={onClose} className={styles.modalCloseBtn}>
          Close
        </button>
      </div>
    </div>
  );
}
