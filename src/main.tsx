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
import { LOGIN, REGISTER, OFFERS, EVENTS } from "./constants.ts";
import { WindowSizeContextProvider } from "./store/window-size-context.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthenticationContextProvider } from "./store/authentication-context.tsx";
import EventsAll from "./pages/EventsAll.tsx";
import EventDetails from "./pages/EventDetails.tsx";
import EventNew from "./pages/EventNew.tsx";
import { FlashMessagesContextProvider } from "./store/flash-messages-context.tsx";

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
        path: `${OFFERS}/:id`,
        element: <SEOfferDetails />,
      },
      {
        path: `${OFFERS}/new`,
        element: <SEOfferNew />,
      },
      {
        path: EVENTS,
        element: <EventsAll />,
      },
      {
        path: `${EVENTS}/:id`,
        element: <EventDetails />,
      },
      {
        path: `${EVENTS}/new`,
        element: <EventNew />,
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
