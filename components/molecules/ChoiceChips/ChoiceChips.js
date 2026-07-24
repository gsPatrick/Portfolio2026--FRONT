import styles from "./ChoiceChips.module.css";

export default function ChoiceChips({ label, options, value, onChange }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.label}>{label}</legend>

      <div className={styles.chips}>
        {options.map((option) => (
          <button
            className={`${styles.chip} ${
              value === option ? styles.active : ""
            }`}
            type="button"
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={value === option}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
