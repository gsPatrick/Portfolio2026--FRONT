import styles from "./Button.module.css";

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  type = "button",
  ...rest
}) {
  const className = [styles.button, styles[variant], styles[size]].join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} type={type} {...rest}>
      {content}
    </button>
  );
}
