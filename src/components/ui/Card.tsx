import styles from "./Card.module.css";

interface Props {
  children: any;
  color?: string;
  border_radius?: string;
  customStyle?: string;
}

function Card({ children, color, border_radius, customStyle }: Props) {
  if (!color) color = "white";
  if (!border_radius) border_radius = "6px";
  const cardConfigurableStyles = {
    backgroundColor: color,
    borderRadius: border_radius,
  };

  return (
    <div
      className={`${styles.card} ${customStyle}`}
      style={cardConfigurableStyles}
    >
      {children}
    </div>
  );
}

export default Card;
