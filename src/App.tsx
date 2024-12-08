import { type Component } from "solid-js";
import ColorSchemeProvider from "./components/color-scheme-provider";
import Header from "./components/header";
import DockLayout from "./components/dock-layout/dock-layout";
import { DockLayoutDefinition } from "./components/dock-layout/dock-layout-definition";
import { IconFunction, IconList, IconSitemap, IconTerminal2 } from "@tabler/icons-solidjs";

const App: Component = () => {
  const defaultLayout = {
    root: {
      type: "box",
      direction: "row",
      children: [
        {
          type: "panel",
          label: "Functions",
          icon: (props) => <IconFunction {...props}/>,
          content: () => <span>Functions content</span>,
        },
        {
          type: "box",
          direction: "col",
          weight: 10,
          children: [
            {
              type: "panel",
              label: "Graph",
              weight: 8,
              icon: (props) => <IconSitemap {...props}/>,
              content: () => <span>Graph content</span>,
            },
            {
              type: "panel",
              label: "Console",
              icon: (props) => <IconTerminal2 {...props}/>,
              content: () => <span>Console content</span>,
            },
          ]
        },
        {
          type: "panel",
          label: "Details",
          icon: (props) => <IconList {...props}/>,
          content: () => <span>Details content</span>,
        }
      ]
    }
  } as DockLayoutDefinition;

  return (
    <ColorSchemeProvider>
      <Header />
      <main class="h-full">
        <DockLayout defaultLayout={defaultLayout} />
      </main>
    </ColorSchemeProvider>
  );
};

export default App;
