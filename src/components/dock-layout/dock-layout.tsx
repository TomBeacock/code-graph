import { Component } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { DockLayoutDefinition, Id } from "./dock-layout-definition";
import { calculateRegionAbsolute, calculateRegionRect, movePanel, validateLayout } from "./dock-functions";
import DockBox from "./dock-box";
import DockPanel from "./dock-panel";
import DockProvider from "./dock-provider";
import DockIndicator, { DockIndicatorProps } from "./dock-indicator";
import { Vector2 } from "../../util/vector2";

export type Region = "left" | "right" | "top" | "bottom" | "center";

export type DockDragData = {
  src?: Id,
  dst?: "root" | Id,
  region: Region,
}

const DockLayout: Component<{ defaultLayout: DockLayoutDefinition }> = (props) => {
  const [layout, setLayout] = createStore(validateLayout(props.defaultLayout));
  const [indicator, setIndicator] = createStore<DockIndicatorProps>({
    visible: false,
    x: 0, y: 0,
    width: 0, height: 0
  });
  const [dragData, setDragData] = createStore<DockDragData>({
    src: "",
    dst: "root",
    region: "left",
  });

  let ref: HTMLDivElement | undefined;

  return (
    <DockProvider value={{ layout, setLayout, indicator, setIndicator, dragData, setDragData }}>
      <div
        ref={ref}
        class="grid h-full overflow-auto"
        on:dragenter={onDragEnter}
        on:dragover={onDragOver}
        on:dragleave={onDragLeave}
        on:drop={onDrop}
      >
        {layout.root !== null && (layout.root.type === "box" ?
          <DockBox {...layout.root} /> :
          <DockPanel {...layout.root} />
        )}
        <DockIndicator {...indicator} />
      </div>
    </DockProvider>
  );

  function onDragEnter(event: DragEvent) {
    event.preventDefault();
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (ref === undefined) {
      return;
    }

    const rect = ref.getBoundingClientRect()
    const region = calculateRegionAbsolute(new Vector2(event.x, event.y), rect);

    if (region === "center") {
      if ((dragData.dst === undefined || dragData.dst === "root") && event.dataTransfer !== null) {
        event.dataTransfer.dropEffect = "none";

        setDragData(produce(dragData => { dragData.dst = undefined; }));
        setIndicator(produce(indicator => { indicator.visible = false; }));
      }
      return;
    }

    setDragData(produce(dragData => {
      dragData.dst = "root";
      dragData.region = region;
    }));
    setIndicator({
      visible: true,
      ...calculateRegionRect(rect, region),
    });
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault();

    setDragData(produce(dragData => {
      dragData.dst = undefined;
    }));
    setIndicator(produce(indicator => {
      indicator.visible = false;
    }));
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();

    setLayout(produce(layout => {
      if(dragData.src === undefined || dragData.dst === undefined) {
        return;
      }
      movePanel(layout, dragData.src, dragData.dst, dragData.region);
    }));
    setIndicator(produce(indicator => {
      indicator.visible = false;
    }));
    setDragData(produce(dragData => {
      dragData.src = undefined;
    }));
  }
}

export default DockLayout;