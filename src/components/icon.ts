export type IconProps = {
  width?: string,
  height?: string,
  fill?: string,
  stroke?: string,
}

function Icon(path: string, props: IconProps) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "width", props.width || "24");
  svg.setAttributeNS(null, "height", props.width || "24");
  svg.setAttributeNS(null, "viewBox", "0 0 24 24");
  svg.setAttributeNS(null, "fill", props.fill || "none");
  svg.setAttributeNS(null, "stroke", props.stroke || "currentColor");
  svg.setAttributeNS(null, "stroke-width", "2");
  svg.setAttributeNS(null, "stroke-linecap", "round");
  svg.setAttributeNS(null, "stroke-linejoin", "round");
  svg.innerHTML = path;
  return svg;
}

export const IconArrowBackUp = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 14l-4 -4l4 -4" />
  <path d="M5 10h11a4 4 0 1 1 0 8h-1" />`,
  props
);

export const IconArrowForwardUp = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15 14l4 -4l-4 -4" />
  <path d="M19 10h-11a4 4 0 1 0 0 8h1" />`,
  props
);

export const IconBrightnessAuto = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z" />
  <path d="M10 14.5v-3.5a2 2 0 1 1 4 0v3.5" />
  <path d="M10 13h4" />`,
  props
);

export const IconDeviceFloppy = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
  <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M14 4l0 4l-6 0l0 -4" />`,
  props
);

export const IconFolderOpen = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />`,
  props
);

export const IconMoon = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />`,
  props
);

export const IconPlayerPlay = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8z" />`,
  props
);

export const IconSun = (props: IconProps) => Icon(
  `<path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />`,
  props
);
