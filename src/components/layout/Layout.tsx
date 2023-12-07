import NavigationBar from "./NavigationBar";

import styles from "./Layout.module.css";

interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return (
    <div>
      <NavigationBar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
