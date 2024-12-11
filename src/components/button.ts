type ButtonProps = {
  iconOnly?: boolean,
}

export default function Button(props: ButtonProps) {
  const button = document.createElement("button");
  button.className = "flex items-center gap-x-1 p-1 rounded text-sm hover:bg-gray-100 hover:dark:bg-gray-700 disabled:text-gray-400 disabled:dark:text-gray-600 active:translate-y-0.5";
  if(!props.iconOnly) {
    button.classList.add("px-2");
  }
  return button;
}