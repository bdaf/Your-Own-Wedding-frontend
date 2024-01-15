import { shortStringTo } from "../../helper";
import SEOfferItem from "./SEOfferItem";

import styles from "./SEOfferList.module.css";

interface Props {
  offers: any[];
}

function SEOfferList({ offers }: Props) {
  return (
    <ul className={styles.offers_container}>
      {offers.map((offer) => (
        <SEOfferItem
          key={offer.id}
          id={offer.id}
          title={shortStringTo(20, offer.title)}
          description={shortStringTo(20, offer.description)}
          address={shortStringTo(20, offer.address)}
          images={offer.images}
        />
      ))}
    </ul>
  );
}

export default SEOfferList;
