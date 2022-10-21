interface ButtonProps {
  ky: string;
  className?: string;
  id: string;
  handleInput: (key: string) => void;
}

const Button = ({ ky, className = "", id, handleInput }: ButtonProps) => (
  <button
    id={id}
    className={"button " + className}
    onClick={() => handleInput(ky)}
  >
    {ky}
  </button>
);
export default Button;
