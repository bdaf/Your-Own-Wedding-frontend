interface Props {
  onClickInBackground: React.MouseEventHandler<HTMLElement>;
}

function Backdrop({ onClickInBackground }: Props) {
  return <div className="backdrop" onClick={onClickInBackground} />;
}

export default Backdrop;
