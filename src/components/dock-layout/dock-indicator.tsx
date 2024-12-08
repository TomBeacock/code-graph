import { Component } from "solid-js";

export type DockIndicatorProps = {
  visible: boolean,
  x: number,
  y: number,
  width: number,
  height: number;
}

const DockIndicator: Component<DockIndicatorProps> = (props) => {
  return (
    <div
      class={`fixed pointer-events-none transition-rect data-[visible=false]:invisible bg-violet-300/40 dark:bg-gray-700/50`}
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
      data-visible={props.visible}
    />
  )
}

export default DockIndicator;