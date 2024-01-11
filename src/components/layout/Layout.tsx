import NavigationBar from "./NavigationBar";

import styles from "./Layout.css";
import { Outlet } from "react-router-dom";
import FlashMessagesContext from "../../store/flash-messages-context";
import { useContext } from "react";

function Layout() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  // if(flashMsgCtx.getFlashMessage){
  //   if(flashMsgCtx.getFlashMessageType == )
  // }
  return (
    <>
      <NavigationBar />
      <main className="width-80-center">
        {/* <div className="alert alert-success" role="alert">
          This is a primary alert—check it out!
          <div className="right">
            sd
            <div className="close">close</div>
          </div>
        </div> */}
        {/* {if(flashMsgCtx.)} */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
