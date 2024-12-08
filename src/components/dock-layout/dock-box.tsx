import { Component, For, Match, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import { DockBoxDefinition, DockPanelDefinition, Id } from "./dock-layout-definition";
import DockPanel from "./dock-panel";
import { useDock } from "./dock-provider";
import { clamp01 } from "../../util/clamp";
import { findNode } from "./dock-functions";

const DockBox: Component<DockBoxDefinition> = (props) => {

  return (
    <div
      class={`basis-48 shrink-0 flex ${props.direction === "row" ? "flex-row" : "flex-col"}`}
      style={{ "flex-grow": props.weight }}
    >
      <For each={props.children}>
        {(def, index) =>
          <>
            <Show when={index() > 0}>
              <DockBoxDivider
                boxDef={{ ...props }}
                index={(index() - 1) * 2 + 1}
                prevNodeId={props.children[index() - 1].id!}
                nextNodeId={props.children[index()].id!}
              />
            </Show>
            <Switch>
              <Match when={def.type === "box"}>
                <DockBox {...def as DockBoxDefinition} />
              </Match>
              <Match when={def.type === "panel"}>
                <DockPanel {...def as DockPanelDefinition} />
              </Match>
            </Switch>
          </>
        }
      </For>
    </div>
  );
}

export default DockBox;

type DockBoxProviderProps = {
  boxDef: DockBoxDefinition,
  index: number,
  prevNodeId: Id,
  nextNodeId: Id,
}

const DockBoxDivider: Component<DockBoxProviderProps> = (props) => {
  const { setLayout } = useDock();

  let dividerRef: HTMLDivElement | undefined;

  const isRow = props.boxDef.direction === "row";

  function onPointerDown(event: PointerEvent) {
    event.preventDefault();
    document.body.classList.add(isRow ? "[&_*]:!cursor-ew-resize" : "[&_*]:!cursor-ns-resize");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event: PointerEvent) {
    if (dividerRef === undefined || dividerRef.parentElement === null) {
      return;
    }
    // Get rect of siblings
    const box = dividerRef.parentElement;
    const prevRect = box.children[props.index - 1].getBoundingClientRect();
    const nextRect = box.children[props.index + 1].getBoundingClientRect();

    // Calculate pointer position as percentage of sibling bounds
    const pos = isRow ? event.x : event.y;
    const minBound = (isRow ? prevRect.left : prevRect.top) + 192;
    const maxBound = (isRow ? nextRect.right : nextRect.bottom) - 192;
    const percent = clamp01((pos - minBound) / (maxBound - minBound));

    setLayout(
      produce((layout) => {
        // Find siblings
        const prevNode = findNode(layout, props.prevNodeId);
        const nextNode = findNode(layout, props.nextNodeId);
        if (prevNode === undefined || nextNode === undefined) {
          return;
        }
        // Update sibling weights
        const weight = prevNode.weight! + nextNode.weight!;
        prevNode.weight = weight * percent;
        nextNode.weight = weight * (1 - percent);
      })
    );
  }

  function onPointerUp() {
    document.body.classList.remove("[&_*]:!cursor-ew-resize", "[&_*]:!cursor-ns-resize");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  const cursor = isRow ? "cursor-ew-resize" : "cursor-ns-resize";
  return (
    <div
      ref={dividerRef}
      class={`relative flex-none basis-0.5 ${cursor} after:absolute after:inset-0 ${isRow ? "after:-inset-x-1" : "after:-inset-y-1"}`}
      onPointerDown={onPointerDown}
    />
  );
}