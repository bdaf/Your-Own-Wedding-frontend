import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import styles from "./SEOfferItem.module.css";
import noImageFound from "../images/No Image Found.png";
import { upperCaseFirstStringCharacter } from "../../helper";

interface Props {
  id: number;
  images: string[];
  title: string;
  description: string;
  category: string;
  prize: number;
  address: string;
}

function SEOfferItem({
  id,
  images,
  title,
  description,
  category,
  prize,
  address,
}: Props) {
  const navigate = useNavigate();
  function detailsButtonHandler(): void {
    navigate(id.toString());
  }

  return (
    <li className={styles.item} key={id}>
      <Card>
        <div className={styles.image} onClick={detailsButtonHandler}>
          {<img src={!!images.length ? images[0] : noImageFound} alt="PHOTO" />}
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={styles.actions}>
            <span
              className={styles.category}
            >{`Category ${upperCaseFirstStringCharacter(category)}`}</span>
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <button className="btn-light" onClick={detailsButtonHandler}>
            Details
          </button>
          <span className={styles.prize}>{`Prize ${prize} PLN`}</span>
        </div>
      </Card>
    </li>
  );
}

export default SEOfferItem;
