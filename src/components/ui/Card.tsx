import styles from "./Card.module.css";

interface Props {
  children: any;
  color?: string;
}

function Card({ children, color }: Props) {
  if (!color) color = "white";
  return <div className={styles["card_" + color]}>{children}</div>;
}

export default Card;
