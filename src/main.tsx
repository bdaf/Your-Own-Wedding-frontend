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
import { PAGE_LOGIN, PAGE_REGISTER, SE_OFFERS } from "./constants.ts";
import { WindowSizeContextProvider } from "./store/window-size-context.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { AuthenticationContextProvider } from "./store/authentication-context.tsx";

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
        element: <SEOffersAll />,
      },
      {
        path: `${SE_OFFERS}/:id`,
        element: <SEOfferDetails />,
      },
      {
        path: `${SE_OFFERS}/new`,
        element: <SEOfferNew />,
      },
      {
        path: `/${PAGE_REGISTER}`,
        element: <RegisterPage />,
      },
      {
        path: `/${PAGE_LOGIN}`,
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticationContextProvider>
    <WindowSizeContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </WindowSizeContextProvider>
  </AuthenticationContextProvider>
);
