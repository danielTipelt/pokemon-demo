import styles from "./index.module.css";

export function PokebalCssImage(props: { className?: string }) {
  return (
    <div role="img" className={[styles.pokebal, props.className].join(" ")}>
      <div className={styles.pokebalButton} />
    </div>
  );
}
