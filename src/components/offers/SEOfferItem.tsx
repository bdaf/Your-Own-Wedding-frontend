import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import styles from "./SEOfferItem.module.css";
import noImageFound from "../images/No Image Found.png";
import {
  getOnlyDateAndHourFromDateInString,
  upperCaseFirstStringCharacter,
} from "../../helper";
import { useContext } from "react";
import AuthenticationContext from "../../store/authentication-context";
import { OFFERS } from "../../constants";

interface Props {
  id: number;
  provider_id: number;
  images: string[];
  title: string;
  description: string;
  category: string;
  prize: number;
  address: string;
  created_at: string;
}

function SEOfferItem({
  id,
  provider_id,
  images,
  title,
  description,
  category,
  prize,
  address,
  created_at,
}: Props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);
  function detailsButtonHandler(): void {
    navigate(`/${OFFERS}/${id.toString()}`);
  }
  function editButtonHandler(): void {
    navigate(`/${OFFERS}/${id.toString()}/edit`);
  }

  return (
    <li className={styles.item} key={id}>
      <Card>
        <div className={styles.image} onClick={detailsButtonHandler}>
          {<img src={!!images.length ? images[0] : noImageFound} alt="PHOTO" />}
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <span>{`Published date: ${getOnlyDateAndHourFromDateInString(
            created_at
          )}`}</span>
          <p>{description}</p>
          <div className={styles.actions}>
            <span
              className={styles.category}
            >{`Category ${upperCaseFirstStringCharacter(category)}`}</span>
            <address>{address}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <div>
            <button className="btn-light" onClick={detailsButtonHandler}>
              Details
            </button>
            {authCtx.isSupportUser() &&
              authCtx.getCurrentUser().provider?.id == provider_id && (
                <button className={styles.btn_edit} onClick={editButtonHandler}>
                  Edit
                </button>
              )}
          </div>

          <span className={styles.prize}>
            {prize ? `Prize ${prize} PLN` : ""}
          </span>
        </div>
      </Card>
    </li>
  );
}

export default SEOfferItem;
