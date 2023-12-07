interface Props {
  onCancel: React.MouseEventHandler<HTMLElement>;
  onConfirm: React.MouseEventHandler<HTMLElement>;
}

function Modal({ onCancel, onConfirm }: Props) {
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <div className="center">
        <button className="btn btn--alt" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Modal;
