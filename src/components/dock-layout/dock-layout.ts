import Vector2 from "../../lib/math/vector2";
import { Store } from "../../lib/store";
import DockBox from "./dock-box";
import { calculateRegionAbsolute, calculateRegionRect, movePanel, Region, validateLayout } from "./dock-functions";
import DockIndicator, { setIndicatorRect, setIndicatorVisibility } from "./dock-indicator";
import { DockLayoutDefinition, DockNodeDefinition, Id } from "./dock-layout-definition";
import DockPanel from "./dock-panel";

export type DockStore = {
  drag: {
    isDragging: boolean,
    srcId?: Id,
    dstId?: "root" | Id,
    dstRegion: Region,
    indicator: HTMLElement,
  }
}

const dockStore = new Store<DockStore>();

export function getDockStore(element: HTMLElement) {
  const layout = element.closest(".dock-layout");
  if (layout === null) {
    return undefined;
  }
  return dockStore.get(layout.id);
}

let dockIdCounter = 0;

type DockLayoutProps = {
  layout: DockLayoutDefinition,
}

export default function DockLayout(props: DockLayoutProps) {
  validateLayout(props.layout);

  const container = document.createElement("div");
  container.id = `dock-layout-${dockIdCounter++}`;
  container.className = "dock-layout grid h-full overflow-auto";
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("pointerup", onPointerUp);
  
  const root = props.layout.root;
  if (root !== null) {
    container.appendChild(DockNode({ node: root }));
  }
  
  const indicator = DockIndicator();
  container.appendChild(indicator);
  
  dockStore.set(container.id, {
    drag: {
      isDragging: false,
      srcId: undefined,
      dstId: undefined,
      dstRegion: "center",
      indicator,
    },
  });

  function onPointerMove(event: PointerEvent) {
    const dock = dockStore.get(container.id);
    if(!dock || !dock.drag.isDragging) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const region = calculateRegionAbsolute(new Vector2(event.x, event.y), rect);

    if(region === "center") {
      if(!dock.drag.srcId || dock.drag.dstId === "root") {
        dock.drag.dstId = undefined;
        setIndicatorVisibility(indicator, false);
      }
      return;
    }

    dock.drag.dstId = "root";
    dock.drag.dstRegion = region;
    setIndicatorVisibility(indicator, true);
    setIndicatorRect(indicator, calculateRegionRect(rect, region));
  }

  function onPointerLeave() {
    const dock = dockStore.get(container.id);
    if(!dock || !dock.drag.isDragging) {
      return;
    }
    setIndicatorVisibility(indicator, false);
  }
  
  function onPointerUp() {
    const dock = dockStore.get(container.id);
    if(!dock || !dock.drag.isDragging) {
      return;
    }

    if(dock.drag.srcId && dock.drag.dstId && dock.drag.srcId !== dock.drag.dstId) {
      // Update layout.
      movePanel(props.layout, dock.drag.srcId, dock.drag.dstId, dock.drag.dstRegion);

      // Remove old root.
      if(container.children.length > 1 && container.firstChild !== null) {
        container.removeChild(container.firstChild);
      }

      // Create new root.
      if(props.layout.root !== null) {
        container.insertBefore(DockNode({ node: props.layout.root}), indicator);
      }
    }

    setIndicatorVisibility(indicator, false);
    dock.drag.isDragging = false;
    dock.drag.srcId = undefined;
  }


  return container;
}

type DockNodeProps = {
  node: DockNodeDefinition,
}

export const DockNode = (props: DockNodeProps) =>
  props.node.type === "box"
    ? DockBox({ box: props.node })
    : DockPanel({ panel: props.node });