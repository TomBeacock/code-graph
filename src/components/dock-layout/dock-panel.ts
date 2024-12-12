import Vector2 from "../../lib/math/vector2";
import { calculateRegionPercent, calculateRegionRect } from "./dock-functions";
import { setIndicatorRect, setIndicatorVisibility } from "./dock-indicator";
import { getDockStore } from "./dock-layout";
import { DockPanelDefinition, Id } from "./dock-layout-definition"

type DockPanelProps = {
  panel: DockPanelDefinition,
}

export default function DockPanel({ panel }: DockPanelProps) {
  const container = document.createElement("div");
  container.className = "relative grid grid-rows-[auto_1fr] basis-48 shrink-0 grow bg-gray-50 dark:bg-gray-900";
  container.style.flexGrow = String(panel.weight!);
  container.addEventListener("pointerleave", onPointerLeave);
  container.addEventListener("pointermove", onPointerMove);

  const header = DockPanelHeader({ id: panel.id!, label: panel.label, icon: panel.icon });
  container.appendChild(header);

  container.appendChild(panel.content);

  function onPointerLeave() {
    const dock = getDockStore(container);
    if(!dock || !dock.drag.isDragging) {
      return;
    }
    dock.drag.dstId = undefined;
  }

  function onPointerMove(event: PointerEvent) {
    const dock = getDockStore(container);
    if(!dock || !dock.drag.isDragging) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const region = panel.id !== dock.drag.srcId
      ? calculateRegionPercent(new Vector2(event.x, event.y), rect, 0.5)
      : "center";
    
    dock.drag.dstId = panel.id!;
    dock.drag.dstRegion = region;

    const indicator = dock.drag.indicator;
    setIndicatorVisibility(indicator, true);
    setIndicatorRect(indicator, calculateRegionRect(rect, region));
  }

  return container;
}

type DockPanelHeaderProps = {
  id: Id,
  label: string,
  icon?: SVGSVGElement,
}

function DockPanelHeader(props: DockPanelHeaderProps) {
  const header = document.createElement("div");
  header.className = "flex cursor-pointer";
  header.addEventListener("pointerdown", onPointerDown);

  const title = document.createElement("div");
  title.className = "flex items-center gap-x-1 p-1 text-gray-500 dark:text-gray-400";
  header.appendChild(title);

  if (props.icon) {
    props.icon.setAttributeNS(null, "width", "18");
    props.icon.setAttributeNS(null, "height", "18");
    title.appendChild(props.icon);
  }

  const label = document.createElement("span");
  label.className = "text-sm uppercase font-semibold select-none";
  label.innerText = props.label;
  title.appendChild(label);

  function onPointerDown() {
    const dock = getDockStore(header);
    if(!dock) {
      return;
    }
    dock.drag.isDragging = true;
    dock.drag.srcId = props.id;
  }

  return header;
}