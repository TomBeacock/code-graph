const colorSchemes = ["auto", "light", "dark"] as const;
type ColorScheme = typeof colorSchemes[number];

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

let currentColorScheme: ColorScheme = getStoredColorScheme();
updateColorScheme();

darkQuery.addEventListener("change", () => {
  if (currentColorScheme === "auto") {
    updateColorScheme();
  }
});

function getStoredColorScheme() {
  const stored = localStorage.getItem("colorScheme") as ColorScheme;
  return stored !== null && colorSchemes.includes(stored) ? stored : "auto";
}

function updateColorScheme() {
  if (currentColorScheme === "auto") {
    const preferred = darkQuery.matches ? "dark" : "light";
    document.documentElement.dataset.colorScheme = preferred;
  }
  else {
    document.documentElement.dataset.colorScheme = currentColorScheme;
  }
  localStorage.setItem("colorScheme", currentColorScheme);
}

export function setColorScheme(colorScheme: ColorScheme) {
  if (currentColorScheme === colorScheme) {
    return;
  }
  currentColorScheme = colorScheme;
  updateColorScheme();
}
