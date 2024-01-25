import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SEOffersAll from "./pages/SEOffersAll.tsx";
import SEOfferDetails from "./pages/SEOfferDetails.tsx";
import SEOfferNew from "./pages/SEOfferNew.tsx";
import ErrorPage from "./ErrorPage.tsx";

import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import {
  LOGIN,
  REGISTER,
  OFFERS,
  EVENTS,
  GUESTS,
  PROFILE,
} from "./constants.ts";
import { WindowSizeContextProvider } from "./store/window-size-context.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthenticationContextProvider } from "./store/authentication-context.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import { FlashMessagesContextProvider } from "./store/flash-messages-context.tsx";
import SEOffersMy from "./pages/SEOffersMy.tsx";
import SEOfferEdit from "./pages/SEOfferEdit.tsx";
import GuestsPage from "./pages/GuestsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

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
        path: `/${PROFILE}`,
        element: <ProfilePage />,
      },
      {
        path: `/${REGISTER}`,
        element: <RegisterPage />,
      },
      {
        path: `/${LOGIN}`,
        element: <LoginPage />,
      },
      {
        path: OFFERS,
        element: <SEOffersAll />,
      },
      {
        path: `${OFFERS}_my`,
        element: <SEOffersMy />,
      },
      {
        path: `${OFFERS}/:id`,
        element: <SEOfferDetails />,
      },
      {
        path: `${OFFERS}/:id/edit`,
        element: <SEOfferEdit />,
      },
      {
        path: `${OFFERS}/new`,
        element: <SEOfferNew />,
      },
      {
        path: EVENTS,
        element: <EventsPage />,
      },
      {
        path: `${GUESTS}`,
        element: <GuestsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticationContextProvider>
    <WindowSizeContextProvider>
      <FlashMessagesContextProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </FlashMessagesContextProvider>
    </WindowSizeContextProvider>
  </AuthenticationContextProvider>
);
