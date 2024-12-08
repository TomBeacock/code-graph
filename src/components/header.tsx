import { IconArrowBackUp, IconArrowForwardUp, IconBrightnessAuto, IconDeviceFloppy, IconFolderOpen, IconMoon, IconPlayerPlay, IconSun } from "@tabler/icons-solidjs";
import { useColorScheme } from "./color-scheme-provider";
import Button from "./button";
import Divider from "./divider";

const header = () => {
  const setColorScheme = useColorScheme();

  return (
    <header class="flex flex-row justify-between p-2">
      <div class="flex flex-row gap-x-4 items-center">
        <h1 class="text-nowrap text-lg font-semibold uppercase select-none">Code Graph</h1>
        <div class="flex flex-row items-center gap-x-0.5">
          <Button
            class="text-sky-600 dark:text-sky-400 hover:bg-gray-200 hover:dark:bg-gray-800"
            iconOnly
          >
            <IconArrowBackUp />
          </Button>
          <Button
            class="text-sky-600 dark:text-sky-400 hover:bg-gray-200 hover:dark:bg-gray-800"
            iconOnly
          >
            <IconArrowForwardUp />
          </Button>
          <Divider />
          <Button
            class="text-yellow-600 dark:text-yellow-400 hover:bg-gray-200 hover:dark:bg-gray-800"
            iconOnly
          >
            <IconFolderOpen />
          </Button>
          <Button
            class="text-blue-600 dark:text-blue-400 hover:bg-gray-200 hover:dark:bg-gray-800"
            iconOnly
          >
            <IconDeviceFloppy />
          </Button>
          <Divider />
          <Button
            class="text-green-600 dark:text-green-400 hover:bg-gray-200 hover:dark:bg-gray-800"
            iconOnly
          >
            <IconPlayerPlay />
          </Button>
        </div>
        <div class="flex flex-row gap-x-2">
        </div>
      </div>
      <div class="flex flex-row gap-x-0.5">
        <Button
          class="hover:bg-gray-200 hover:dark:bg-gray-800"
          iconOnly
          onClick={() => setColorScheme("auto")}
        >
          <IconBrightnessAuto />
        </Button>
        <Button
          class="hover:bg-gray-200 hover:dark:bg-gray-800"
          iconOnly
          onClick={() => setColorScheme("light")}
        >
          <IconSun />
        </Button>
        <Button
          class="hover:bg-gray-200 hover:dark:bg-gray-800"
          iconOnly
          onClick={() => setColorScheme("dark")}
        >
          <IconMoon />
        </Button>
      </div>
    </header>
  );
}

export default header;