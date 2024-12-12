import { clamp01 } from "../../lib/math/clamp";
import { DockNode } from "./dock-layout";
import { Direction, DockBoxDefinition, DockNodeDefinition } from "./dock-layout-definition"

type DockBoxProps = {
  box: DockBoxDefinition,
}

export default function DockBox({ box }: DockBoxProps) {
  const container = document.createElement("div");
  container.className = "flex basis-48 shrink-0 grow";
  if (box.direction === "col") {
    container.classList.add("flex-col");
  }
  container.style.flexGrow = String(box.weight!);


  let prev: [HTMLElement, DockNodeDefinition] = [DockNode({ node: box.children[0] }), box.children[0]]
  container.appendChild(prev[0]);

  for (let i = 1; i < box.children.length; i++) {
    const child = box.children[i];
    const next: [HTMLElement, DockNodeDefinition] = [DockNode({ node: child }), child];

    container.appendChild(DockDivider({ direction: box.direction, prev, next }));
    container.appendChild(next[0]);

    prev = next;
  }

  return container;
}

type DockBoxDividerProps = {
  direction: Direction,
  prev: [HTMLElement, DockNodeDefinition],
  next: [HTMLElement, DockNodeDefinition],
}

function DockDivider({ direction, prev: [prevElement, prevDef], next: [nextElement, nextDef] }: DockBoxDividerProps) {
  const isRow = direction === "row";

  const div = document.createElement("div");
  div.className = "relative flex-none basis-0.5 after:absolute after:inset-0 after:z-30";
  div.classList.add(...(isRow ? ["cursor-ew-resize", "after:-inset-x-1"] : ["cursor-ns-resize", "after:-inset-y-1"]));
  div.addEventListener("pointerdown", onPointerDown);

  function onPointerDown(event: PointerEvent) {
    event.preventDefault();
    document.body.classList.add(isRow ? "[&_*]:!cursor-ew-resize" : "[&_*]:!cursor-ns-resize");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event: PointerEvent) {
    // Get sibling rects.
    const prevRect = prevElement.getBoundingClientRect();
    const nextRect = nextElement.getBoundingClientRect();

    // Calculate pointer position as percentage of sibling bounds
    const pos = isRow ? event.x : event.y;
    const minBound = (isRow ? prevRect.left : prevRect.top) + 192;
    const maxBound = (isRow ? nextRect.right : nextRect.bottom) - 192;
    const percent = clamp01((pos - minBound) / (maxBound - minBound));

    // Update sibling weights
    const weight = prevDef.weight! + nextDef.weight!;
    prevDef.weight = weight * percent;
    nextDef.weight = weight * (1 - percent);

    prevElement.style.flexGrow = String(prevDef.weight!);
    nextElement.style.flexGrow = String(nextDef.weight!);
  }

  function onPointerUp() {
    document.body.classList.remove("[&_*]:!cursor-ew-resize", "[&_*]:!cursor-ns-resize");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }
  return div;
}