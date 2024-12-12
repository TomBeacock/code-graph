import "./style.css";
import Header from "./components/header";
import DockLayout from "./components/dock-layout/dock-layout";
import { DockLayoutDefinition } from "./components/dock-layout/dock-layout-definition";
import { IconFunction, IconListDetails, IconSitemap, IconTerminal2 } from "./components/icon";

const body = document.body;
body.appendChild(Header());

const main = document.createElement("main");
main.className = "h-full";
body.appendChild(main);

const layout = {
  root: {
    type: "box",
    direction: "row",
    children: [
      {
        type: "panel",
        label: "Functions",
        icon: IconFunction({}),
        content: document.createElement("span"),
      },
      {
        type: "box",
        weight: 10,
        direction: "col",
        children: [
          {
            type: "panel",
            weight: 10,
            label: "Graph",
            icon: IconSitemap({}),
            content: document.createElement("span"),
          },
          {
            type: "panel",
            label: "Console",
            icon: IconTerminal2({}),
            content: document.createElement("span"),
          }
        ]
      },
      {
        type: "panel",
        label: "Details",
        icon: IconListDetails({}),
        content: document.createElement("span"),
      }
    ]
  }
} as DockLayoutDefinition

const dockLayout = DockLayout({ layout });
main.appendChild(dockLayout);