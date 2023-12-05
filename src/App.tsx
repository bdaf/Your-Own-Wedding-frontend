import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllSEOffers from "./pages/AllSEOffers.tsx";
import NewSEOffers from "./pages/NewSEOffers.tsx";
import Favourites from "./pages/Favourites.tsx";
import ErrorPage from "./ErrorPage.tsx";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AllSEOffers />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/se-offers",
      element: <AllSEOffers />,
    },
    {
      path: "/se-offers/new",
      element: <NewSEOffers />,
    },
    {
      path: "/se-offers/favourites",
      element: <Favourites />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
