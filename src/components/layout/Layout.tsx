import NavigationBar from "./NavigationBar";

import styles from "./Layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
