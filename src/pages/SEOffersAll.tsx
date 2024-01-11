import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";
import { getAllOffers } from "../services/offerService";
import WindowSizeContext from "../store/window-size-context";
import { useContext, useEffect, useState } from "react";

const widthOfFiilterBarChange = 500;

function AllSEOffers() {
  const windowSizeCtx = useContext(WindowSizeContext);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      setLoading(true);
      try {
        const response = await getAllOffers();
        setOffers(response.data);
        console.log(response.data);
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
      {windowSizeCtx.isWindowLessWiderThan(widthOfFiilterBarChange) && (
        <div className="center">
          <Filterbar />
        </div>
      )}
      <div className="content-left flex-wrap-2">
        <div className="flex-shrink-low">
          {windowSizeCtx.isWindowMoreWiderThan(widthOfFiilterBarChange - 1) && (
            <Filterbar />
          )}
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
