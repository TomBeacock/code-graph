export type DockLayoutDefinition = {
  root: DockNodeDefinition | null,
}

export type DockNodeDefinition = DockBoxDefinition | DockPanelDefinition;

export type Id = string

type DockNodeDefinitionBase = {
  id?: Id,
  weight?: number,
}

export type Direction = "row" | "col"

export type DockBoxDefinition = DockNodeDefinitionBase & {
  type: "box",
  direction: Direction,
  children: DockNodeDefinition[],
}

export type DockPanelDefinition = DockNodeDefinitionBase & {
  type: "panel",
  label: string,
  icon?: SVGSVGElement,
  content: HTMLElement,
}