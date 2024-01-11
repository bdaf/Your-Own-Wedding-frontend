import SEOfferItem from "./SEOfferItem";

import styles from "./SEOfferList.module.css";

interface Props {
  offers: any[];
}

function SEOfferList({ offers }: Props) {
  function shortStringTo(
    characters_number: number,
    textToBeShorted: string
  ): string {
    if (textToBeShorted.length > characters_number) {
      return textToBeShorted.substring(0, characters_number) + "..";
    }
    return textToBeShorted;
  }

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
