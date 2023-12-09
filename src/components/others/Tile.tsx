import { useState } from "react";
import Modal from "./not-independent-components/Modal";
import Backdrop from "./not-independent-components/Backdrop";

import styles from "./Tile.module.css";

interface Props {
  title: string;
  children: any;
}

function Tile({ title, children }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <div className="tile">
        <h1>{title}</h1>
        {children}
        <div className="content-right">
          <button className={styles.btn} onClick={deleteHandler}>
            Delete
          </button>
          {modalIsOpen && (
            <Modal onCancel={closeModal} onConfirm={closeModal} />
          )}
          {modalIsOpen && <Backdrop onClickInBackground={closeModal} />}
        </div>
      </div>
    </>
  );
}

export default Tile;
