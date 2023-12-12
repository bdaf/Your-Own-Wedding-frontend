import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";

import { API_URL } from "../constants";
import { useEffect, useState } from "react";

function AllSEOffers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
        setError("Error has occured, try again later.");
        console.log("An error occurred: ", e);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  if (loading) return <div className="title">Loading...</div>;
  if (error) return <div className="title">{error}</div>;
  return (
    <div>
      <div className="title">All SEOffers</div>
      <div className="content-left flex-wrap-2">
        <div className="flex-shrink-low">
          <Filterbar />
        </div>
        <div className="main-content flex-shrink-high">
          <SearchBar />
          <SEOfferList offers={offers} />
        </div>
      </div>
    </div>
  );
}

export default AllSEOffers;
