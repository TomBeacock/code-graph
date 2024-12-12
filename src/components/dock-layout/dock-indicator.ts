import { Px } from "../../lib/math/units";

export default function DockIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "dock-indicator fixed pointer-events-none transition-rect data-[visible=false]:invisible bg-violet-300/40 dark:bg-gray-700/50";
  indicator.style.left = Px(0);
  indicator.style.top = Px(0);
  indicator.style.width = Px(0);
  indicator.style.height = Px(0);
  indicator.dataset.visible = String(false);

  return indicator;
}

export function setIndicatorVisibility(indicator: HTMLElement, visible: boolean) {
  indicator.dataset.visible = String(visible);
}

export function setIndicatorRect(indicator: HTMLElement, { x, y, width, height }: { x: number, y: number, width: number, height: number }) {
  indicator.style.left = Px(x);
  indicator.style.top = Px(y);
  indicator.style.width = Px(width);
  indicator.style.height = Px(height);
}