import { Component, splitProps, ValidComponent } from "solid-js";
import { DockPanelDefinition, Id } from "./dock-layout-definition";
import { Dynamic } from "solid-js/web";
import { useDock } from "./dock-provider";
import { produce } from "solid-js/store";
import { calculateRegionPercent, calculateRegionRect } from "./dock-functions";
import { Vector2 } from "../../util/vector2";
import { Region } from "./dock-layout";

const DockPanel: Component<DockPanelDefinition> = (props) => {
  const [local] = splitProps(props, ["label", "icon"]);

  const { setIndicator, dragData, setDragData } = useDock();

  let ref: HTMLDivElement | undefined;
  let dropzoneRef: HTMLDivElement | undefined;

  return (
    <div
      ref={ref}
      class={"relative grid grid-rows-[auto_1fr] basis-48 shrink-0 bg-gray-50 dark:bg-gray-900"}
      style={{ "flex-grow": props.weight }}
      on:dragenter={onDragEnter}
      on:dragover={onDragOver}
      on:drop={onDrop}
    >
      <DockPanelHeader id={props.id!} {...local} />
      <Dynamic component={props.content} />
      <div ref={dropzoneRef} class="absolute inset-0 hidden" on:dragleave={onDragLeave}/>
    </div>
  );

  function onDragEnter(event: DragEvent) {
    if(dropzoneRef === undefined) {
      return;
    }
    event.preventDefault();
    dropzoneRef.classList.remove("hidden");
  }

  function onDragOver(event: DragEvent) {
    if (ref === undefined) {
      return;
    }

    event.preventDefault();

    const rect = ref.getBoundingClientRect();
    let region: Region = "center";
    if (dragData.src !== props.id) {
      region = calculateRegionPercent(new Vector2(event.x, event.y), rect, 0.5);
    }
    const regionRect = calculateRegionRect(rect, region);

    setIndicator({
      visible: true,
      ...regionRect,
    });

    setDragData(produce(dragData => {
      dragData.dst = props.id!;
      dragData.region = region;
    }));
  }

  function onDrop() {
    if(dropzoneRef === undefined) {
      return;
    }
    dropzoneRef.classList.add("hidden");
  }

  function onDragLeave(event: DragEvent) {
    if(dropzoneRef === undefined) {
      return;
    }

    event.preventDefault();

    dropzoneRef.classList.add("hidden");

    setDragData(produce(dragData => {
      dragData.dst = undefined;
    }));
  }
}

export default DockPanel;

const DockPanelHeader: Component<{ id: Id, label: string, icon?: ValidComponent }> = (props) => {
  const { setDragData } = useDock();

  let ref: HTMLDivElement | undefined;
  let labelRef: HTMLDivElement | undefined;

  return (
    <div
      ref={ref} class="flex cursor-pointer"
      draggable={true}
      on:dragstart={onDragStart}>
      <div
        ref={labelRef}
        class="flex items-center gap-x-1 p-1 text-gray-500 dark:text-gray-400"
      >
        <Dynamic component={props.icon} width={18} height={18} />
        <span class="text-sm uppercase font-semibold select-none">{props.label}</span>
      </div>
    </div>
  )

  function onDragStart(event: DragEvent) {
    if (event.dataTransfer === null || labelRef === undefined) {
      return;
    }
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    const rect = labelRef.getBoundingClientRect();
    event.dataTransfer.setDragImage(labelRef, rect.width / 2, rect.height + 2);

    setDragData(produce(dragData => {
      dragData.src = props.id;
    }));
  }
}