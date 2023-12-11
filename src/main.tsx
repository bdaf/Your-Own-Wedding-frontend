import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AllSEOffers from "./pages/AllSEOffers.tsx";
import SEOfferDetails from "./pages/SEOfferDetails.tsx";
import NewSEOffer from "./pages/NewSEOffer.tsx";
import Favourites from "./pages/Favourites.tsx";
import ErrorPage from "./ErrorPage.tsx";

import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "se-offers",
        element: <AllSEOffers />,
      },
      {
        path: "se-offers/:id",
        element: <SEOfferDetails />,
      },
      {
        path: "se-offers/new",
        element: <NewSEOffer />,
      },
      {
        path: "se-offers/favourites",
        element: <Favourites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
