import { createContext, ParentComponent, useContext } from "solid-js";
import { DockLayoutDefinition } from "./dock-layout-definition";
import { SetStoreFunction } from "solid-js/store";
import { DockIndicatorProps } from "./dock-indicator";
import { DockDragData } from "./dock-layout";

type DockContextType = {
  layout: DockLayoutDefinition,
  setLayout: SetStoreFunction<DockLayoutDefinition>,
  indicator: DockIndicatorProps,
  setIndicator: SetStoreFunction<DockIndicatorProps>,
  dragData: DockDragData,
  setDragData: SetStoreFunction<DockDragData>,
}

const DockContext = createContext<DockContextType>({
  layout: { root: null },
  setLayout: () => { },
  indicator: { visible: false, x: 0, y: 0, width: 0, height: 0 },
  setIndicator: () => { },
  dragData: { src: "", dst: "root", region: "left" },
  setDragData: () => { },
});

const DockProvider: ParentComponent<{ value: DockContextType }> = (props) => {
  return (
    <DockContext.Provider value={props.value}>
      {props.children}
    </DockContext.Provider>
  )
}

export default DockProvider;

export const useDock = () => useContext(DockContext);
