import styles from "./Field.module.css";

export default function Field({
  id,
  label,
  hint,
  as = "input",
  ...rest
}) {
  const Control = as;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </label>

      <Control
        className={`${styles.control} ${as === "textarea" ? styles.area : ""}`}
        id={id}
        name={id}
        {...rest}
      />
    </div>
  );
}
