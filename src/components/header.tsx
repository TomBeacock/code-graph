import { IconArrowBackUp, IconArrowForwardUp, IconBrightnessAuto, IconDeviceFloppy, IconFolderOpen, IconMoon, IconPlayerPlay, IconSun } from "@tabler/icons-solidjs";
import { useColorScheme } from "./color-scheme-provider";
import Button from "./button";
import Divider from "./divider";

const header = () => {
  const setColorScheme = useColorScheme();

  return (
    <header class="flex flex-row justify-between p-2 bg-gray-100 dark:bg-gray-800">
      <div class="flex flex-row gap-x-4 items-center">
        <h1 class="text-nowrap text-lg font-semibold uppercase select-none">Code Graph</h1>
        <div class="flex flex-row items-center gap-x-0.5">
          <Button class="text-sky-600 dark:text-sky-400" iconOnly><IconArrowBackUp /></Button>
          <Button class="text-sky-600 dark:text-sky-400" iconOnly><IconArrowForwardUp /></Button>
          <Divider />
          <Button class="text-yellow-600 dark:text-yellow-400" iconOnly><IconFolderOpen /></Button>
          <Button class="text-blue-600 dark:text-blue-400" iconOnly><IconDeviceFloppy /></Button>
          <Divider />
          <Button class="text-green-600 dark:text-green-400" iconOnly><IconPlayerPlay /></Button>
        </div>
        <div class="flex flex-row gap-x-2">
        </div>
      </div>
      <div class="flex flex-row gap-x-0.5">
        <Button iconOnly on:click={() => setColorScheme("auto")}><IconBrightnessAuto /></Button>
        <Button iconOnly on:click={() => setColorScheme("light")}><IconSun /></Button>
        <Button iconOnly on:click={() => setColorScheme("dark")}><IconMoon /></Button>
      </div>
    </header>
  );
}

export default header;