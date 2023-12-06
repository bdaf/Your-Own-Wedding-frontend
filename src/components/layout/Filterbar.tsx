import styles from "./Filterbar.module.css";

function Filterbar() {
  return (
    <>
      <div className={styles.filter}>
        <h2>Filter offers</h2>
        <div>
          <form role="search">
            <input
              className={styles.search}
              placeholder="Search"
              type="search"
            />
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}

export default Filterbar;
