interface Props {
  id: BigInteger;
  image: string;
  title: string;
  description: string;
  address: string;
}

function SEOfferItem({ id, image, title, description, address }: Props) {
  return (
    <li>
      <div>
        <img src={image} alt="PHOTO" />
      </div>
      <div>
        <h3>{title}</h3>
        <address>{address}</address>
        <p>{description}</p>
      </div>
      <div>
        <button>To Favourites</button>
      </div>
    </li>
  );
}

export default SEOfferItem;
