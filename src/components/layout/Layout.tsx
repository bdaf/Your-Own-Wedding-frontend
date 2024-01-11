import NavigationBar from "./NavigationBar";

import styles from "./Layout.css";
import { Outlet } from "react-router-dom";
import FlashMessagesContext from "../../store/flash-messages-context";
import { useContext, useEffect } from "react";

function Layout() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  // if(flashMsgCtx.getFlashMessage()){
  //   if(flashMsgCtx.getFlashMessageType() == )
  // }

  useEffect(() => {
    flashMsgCtx.makeFlashMessageOlder();
    console.log("jest");
  }, []);
  function closeAlertHandler(): void {
    flashMsgCtx.setFlashMessage("", "");
  }

  return (
    <>
      <NavigationBar />
      <main className="width-80-center">
        {flashMsgCtx.getFlashMessage() && (
          <>
            <div className="alert alert-success" role="alert">
              {flashMsgCtx.getFlashMessage()}
            </div>
            <div onClick={closeAlertHandler}>CLOSE</div>
          </>
        )}
        {/* {if(flashMsgCtx.)} */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
