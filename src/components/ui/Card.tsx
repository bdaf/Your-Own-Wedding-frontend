import styles from "./Card.module.css";

interface Props {
  children: any;
}

function Card({ children }: Props) {
  return <div className={styles.card}>{children}</div>;
}

export default Card;
