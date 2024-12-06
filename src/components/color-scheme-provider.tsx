import { createContext, createEffect, createSignal, type ParentComponent, Setter, useContext } from "solid-js";

const colorSchemes = ["auto", "light", "dark"];
type ColorScheme = typeof colorSchemes[number];

const ColorSchemeContext = createContext<Setter<ColorScheme>>(() => {});

const initializeColorScheme = () => {
  const stored = localStorage.getItem("colorScheme");
  return stored !== null && colorSchemes.includes(stored) ? stored : "auto";
}

const ColorSchemeProvider: ParentComponent = (props) => {
  const [colorScheme, setColorScheme] = createSignal<ColorScheme>(initializeColorScheme());

  createEffect(() => {
    if (colorScheme() === "auto") {
      const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.colorScheme = preferred;
    }
    else {
      document.documentElement.dataset.colorScheme = colorScheme();
    }
    localStorage.setItem("colorScheme", colorScheme());
  });

  return (
    <ColorSchemeContext.Provider value={setColorScheme}>
      {props.children}
    </ColorSchemeContext.Provider>
  );
};

export function useColorScheme() { return useContext(ColorSchemeContext); }

export default ColorSchemeProvider;
