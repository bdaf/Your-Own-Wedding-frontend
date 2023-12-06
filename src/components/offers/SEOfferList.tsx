import SEOfferItem from "./SEOfferItem";

interface Props {
  offers: any[];
}

function SEOfferList({ offers }: Props) {
  return (
    <ul>
      {offers.map((offer) => (
        <SEOfferItem
          key={offer.id}
          id={offer.id}
          image={offer.main_photo.url}
          title={offer.title}
          description={offer.description}
          address={offer.address}
        />
      ))}
    </ul>
  );
}

export default SEOfferList;
