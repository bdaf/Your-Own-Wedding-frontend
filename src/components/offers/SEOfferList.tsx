import { shortStringTo } from "../../helper";
import { OfferModel } from "../Models";
import SEOfferItem from "./SEOfferItem";

import styles from "./SEOfferList.module.css";

interface Props {
  offers: OfferModel[];
}

function SEOfferList({ offers }: Props) {
  return (
    <div className={styles.offers_container}>
      {offers.map((offer) => (
        <SEOfferItem
          key={offer.id}
          id={offer.id}
          user_id={offer.user_id!}
          title={shortStringTo(30, offer.title)}
          description={shortStringTo(100, offer.description)}
          address={shortStringTo(40, offer.address)}
          images={offer.images}
          category={offer.category}
          prize={offer.prize}
          created_at={offer.created_at!}
        />
      ))}
    </div>
  );
}

export default SEOfferList;
