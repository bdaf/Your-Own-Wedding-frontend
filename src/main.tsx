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
import { SE_OFFERS } from "./constants.ts";

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
        path: SE_OFFERS,
        element: <AllSEOffers />,
      },
      {
        path: `${SE_OFFERS}/:id`,
        element: <SEOfferDetails />,
      },
      {
        path: `${SE_OFFERS}/new`,
        element: <NewSEOffer />,
      },
      {
        path: `${SE_OFFERS}/favourites`,
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
