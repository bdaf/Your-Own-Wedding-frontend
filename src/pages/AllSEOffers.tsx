import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";
import DUMMY_DATA from "../dummy-data";
function AllSEOffers() {
  return (
    <div>
      <h1>AllSEOffers page</h1>
      <div className="main-content">
        <Filterbar />
        <div>
          <SearchBar />
          <SEOfferList offers={DUMMY_DATA} />
        </div>
      </div>
    </div>
  );
}

export default AllSEOffers;
