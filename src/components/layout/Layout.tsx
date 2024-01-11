import NavigationBar from "./NavigationBar";

import { Outlet } from "react-router-dom";
import Alert from "../ui/Alert";

function Layout() {
  return (
    <>
      <NavigationBar />
      <main className="width-80-center">
        <Alert />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
