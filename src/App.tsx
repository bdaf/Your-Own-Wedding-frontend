import "./App.css";
import { Route } from "react-router-dom";

import AllSEOffers from "./pages/AllSEOffers";
import NewSEOffers from "./pages/NewSEOffers";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <>
      <Route path="/">
        <AllSEOffers />
      </Route>
    </>
  );
}

export default App;
