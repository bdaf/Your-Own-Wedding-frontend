import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";

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
        <div className="actions">
          <button className="btn" onClick={deleteHandler}>
            Close
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
