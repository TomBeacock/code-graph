import { useColorScheme } from "./color-scheme-provider";

const header = () => {
  const setColorScheme = useColorScheme();

  return (
    <header class="flex flex-row justify-between p-2">
      <h1 class="text-2xl font-bold">Code Graph</h1>
      <div class="flex flex-row gap-2">
        <button on:click={() => setColorScheme("auto")}>Auto</button>
        <button on:click={() => setColorScheme("light")}>Light</button>
        <button on:click={() => setColorScheme("dark")}>Dark</button>
      </div>
    </header>
  );
}

export default header;