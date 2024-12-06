import { type Component } from "solid-js";
import ColorSchemeProvider from "./components/color-scheme-provider";
import Header from "./components/header";

const App: Component = () => {
  return (
    <ColorSchemeProvider>
      <div>
        <Header />
      </div>
    </ColorSchemeProvider>
  );
};

export default App;
