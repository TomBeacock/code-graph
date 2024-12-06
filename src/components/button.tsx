import { JSX, ParentComponent, splitProps } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  iconOnly?: boolean,
}

const Button: ParentComponent<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <button
      class={`btn${!props.iconOnly ? " px-2" : ""} ${local.class}`}
      {...others}
    >
      {props.children}
    </button>
  );
}

export default Button;