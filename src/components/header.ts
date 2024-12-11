import { setColorScheme } from "../lib/color-scheme";
import Button from "./button";
import Divider from "./divider";
import { IconArrowBackUp, IconArrowForwardUp, IconBrightnessAuto, IconDeviceFloppy, IconFolderOpen, IconMoon, IconPlayerPlay, IconSun } from "./icon";

export default function Header() {
  const header = document.createElement("header");
  header.className = "flex gap-x-4 items-center p-2";

  const title = document.createElement("h1");
  title.className = "text-nowrap text-lg font-semibold uppercase select-none";
  title.innerText = "Code Graph";
  header.appendChild(title);

  const toolbar = document.createElement("div");
  toolbar.className = "flex items-center gap-x-0.5 grow";
  header.appendChild(toolbar);

  const buttonProps = { iconOnly: true };
  const buttonHoverColors = ["hover:bg-gray-200", "hover:dark:bg-gray-800"];
  const iconProps = { width: "20", height: "20" };

  const undoButton = Button(buttonProps);
  undoButton.classList.add("text-sky-600", "dark:text-sky-400", ...buttonHoverColors);
  undoButton.appendChild(IconArrowBackUp(iconProps));
  toolbar.appendChild(undoButton);

  const redoButton = Button(buttonProps);
  redoButton.classList.add("text-sky-600", "dark:text-sky-400", ...buttonHoverColors);
  redoButton.appendChild(IconArrowForwardUp(iconProps));
  toolbar.appendChild(redoButton);

  toolbar.appendChild(Divider());

  const openButton = Button(buttonProps);
  openButton.classList.add("text-yellow-600", "dark:text-yellow-400", ...buttonHoverColors);
  openButton.appendChild(IconFolderOpen(iconProps));
  toolbar.appendChild(openButton);

  const saveButton = Button(buttonProps);
  saveButton.classList.add("text-blue-600", "dark:text-blue-400", ...buttonHoverColors);
  saveButton.appendChild(IconDeviceFloppy(iconProps));
  toolbar.appendChild(saveButton);

  toolbar.appendChild(Divider());

  const playButton = Button(buttonProps);
  playButton.classList.add("text-green-600", "dark:text-green-400", ...buttonHoverColors);
  playButton.appendChild(IconPlayerPlay(iconProps));
  toolbar.appendChild(playButton);

  const colorSchemeControls = document.createElement("div");
  colorSchemeControls.className = "flex items-center gap-x-0.5";
  header.append(colorSchemeControls);

  const autoButton = Button(buttonProps);
  autoButton.classList.add(...buttonHoverColors);
  autoButton.appendChild(IconBrightnessAuto(iconProps));
  autoButton.addEventListener("click", () => setColorScheme("auto"));
  colorSchemeControls.appendChild(autoButton);

  const lightButton = Button(buttonProps);
  lightButton.classList.add(...buttonHoverColors);
  lightButton.appendChild(IconSun(iconProps));
  lightButton.addEventListener("click", () => setColorScheme("light"));
  colorSchemeControls.appendChild(lightButton);
  
  const darkButton = Button(buttonProps);
  darkButton.classList.add(...buttonHoverColors);
  darkButton.appendChild(IconMoon(iconProps));
  darkButton.addEventListener("click", () => setColorScheme("dark"));
  colorSchemeControls.appendChild(darkButton);

  return header;
}