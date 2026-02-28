import styles from "./_components/Spinner.module.css";

export default function Loader() {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
