import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import AllSEOffers from "./pages/AllSEOffers.tsx";
import NewSEOffers from "./pages/NewSEOffers.tsx";
import Favourites from "./pages/Favourites.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllSEOffers />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
