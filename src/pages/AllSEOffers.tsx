import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";

import { API_URL } from "../constants";
import { useEffect, useState } from "react";

function AllSEOffers() {
  const [offers, setOffers] = useState([]);
  const [, setError] = useState("");
  const [, setLoading] = useState(false);

  useEffect(() => {
    async function loadOffers() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/offers`);
        if (response.ok) {
          const json = await response.json();
          setOffers(json);
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred..");
        console.log("An error occurred: ", e, " dd ", "Sad");
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  return (
    <div>
      <h1>AllSEOffers page</h1>
      <div className="content-left main-font">
        <Filterbar />
        <div className="main-content">
          <SearchBar />
          <SEOfferList offers={offers} />
        </div>
      </div>
    </div>
  );
}

export default AllSEOffers;
