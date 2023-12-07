interface Props {
  children: string;
}

function Button({ children }: Props) {
  return <button className="btn">{children}</button>;
}

export default Button;
