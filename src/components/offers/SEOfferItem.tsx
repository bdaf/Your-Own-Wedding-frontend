import styles from "./SEOfferItem.module.css";

interface Props {
  id: BigInteger;
  image: string;
  title: string;
  description: string;
  address: string;
}

function SEOfferItem({ id, image, title, description, address }: Props) {
  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <img src={image} alt="PHOTO" />
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <address>{address}</address>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        <button>To Favourites</button>
      </div>
    </li>
  );
}

export default SEOfferItem;
