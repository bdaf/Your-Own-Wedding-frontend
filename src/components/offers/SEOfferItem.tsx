import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import styles from "./SEOfferItem.module.css";

interface Props {
  id: number;
  image?: string;
  title: string;
  description: string;
  address: string;
}

function SEOfferItem({ id, image, title, description, address }: Props) {
  const navigate = useNavigate();
  function detailsButtonHandler(): void {
    navigate(id.toString());
  }

  return (
    <li className={styles.item} key={id}>
      <Card>
        <div className={styles.image}>
          <img src={image} alt="PHOTO" />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <button className="btn-light" onClick={detailsButtonHandler}>
            Details
          </button>
          <button className={styles.button_fav}>To Favourites</button>
        </div>
      </Card>
    </li>
  );
}

export default SEOfferItem;
