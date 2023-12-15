import NavigationBar from "./NavigationBar";

import styles from "./Layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavigationBar />
      <main className="width-80-center">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
