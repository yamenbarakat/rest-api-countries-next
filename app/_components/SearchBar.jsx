import styles from "./SearchBar.module.css";

export default function SearchBar({ children }) {
  return (
    <div className={styles.nav} role="search" aria-label="Country search and region filter">
      <div className={`container ${styles.container}`}>{children}</div>
    </div>
  );
}
