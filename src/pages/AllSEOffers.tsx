import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";

function AllSEOffers() {
  const data = [
    {
      id: 1,
      user: {
        name: "Kamil",
        surname: "Kamilowski",
        email: "Kamilowski@YOW.com",
        city: "Bialystok",
        phone_number: "+48 731 140 333",
      },
      title: "Spokojna Wedding",
      description: "Opis sali weselnej.",
      address: "Garbaska 44, 15-307 Białystok",
      inserted_at: "fdgsfdfdgfg",
      closes_at: "fdgsfdfdgfg",
      main_photo: {
        name: "lol",
        description: "lol2",
        url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
      },
      offer_photos: [
        {
          name: "lol",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
        {
          name: "lol2",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
      ],
    },
    {
      id: 1,
      user: {
        name: "Kamil",
        surname: "Kamilowski",
        email: "Kamilowski@YOW.com",
        city: "Bialystok",
        phone_number: "+48 731 140 333",
      },
      title: "Spokojna Wedding",
      description: "Opis sali weselnej.",
      address: "Garbaska 44, 15-307 Białystok",
      inserted_at: "fdgsfdfdgfg",
      closes_at: "fdgsfdfdgfg",
      main_photo: {
        name: "lol",
        description: "lol2",
        url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
      },
      offer_photos: [
        {
          name: "lol",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
        {
          name: "lol2",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
      ],
    },
    {
      id: 1,
      user: {
        name: "Kamil",
        surname: "Kamilowski",
        email: "Kamilowski@YOW.com",
        city: "Bialystok",
        phone_number: "+48 731 140 333",
      },
      title: "Spokojna Wedding",
      description: "Opis sali weselnej.",
      address: "Garbaska 44, 15-307 Białystok",
      inserted_at: "fdgsfdfdgfg",
      closes_at: "fdgsfdfdgfg",
      main_photo: {
        name: "lol",
        description: "lol2",
        url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
      },
      offer_photos: [
        {
          name: "lol",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
        {
          name: "lol2",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
      ],
    },
    {
      id: 1,
      user: {
        name: "Kamil",
        surname: "Kamilowski",
        email: "Kamilowski@YOW.com",
        city: "Bialystok",
        phone_number: "+48 731 140 333",
      },
      title: "Spokojna Wedding",
      description: "Opis sali weselnej.",
      address: "Garbaska 44, 15-307 Białystok",
      inserted_at: "fdgsfdfdgfg",
      closes_at: "fdgsfdfdgfg",
      main_photo: {
        name: "lol",
        description: "lol2",
        url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
      },
      offer_photos: [
        {
          name: "lol",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
        {
          name: "lol2",
          description: "lol2",
          url: "https://wimgix.wedding.pl/vendor_gallery/7nzJ8FrZDXWM3dgxfyt6n8jB85UrNAcMie3fJYAb.jpg?h=450&rot=0",
        },
      ],
    },
  ];

  return (
    <div>
      <h1>AllSEOffers page</h1>
      <div className="main-container">
        <Filterbar />
        <div>
          <SearchBar />
          <SEOfferList offers={data} />
        </div>
      </div>
    </div>
  );
}

export default AllSEOffers;
