import { v7 as uuid } from "uuid";
import { Direction, DockBoxDefinition, DockLayoutDefinition, DockNodeDefinition, Id } from "./dock-layout-definition";
import Vector2 from "../../lib/math/vector2";

export function validateLayout(layout: DockLayoutDefinition) {
  if (layout.root === null) {
    return layout;
  }
  validateNode(layout.root);

  function validateNode(node: DockNodeDefinition) {
    if (node.id === undefined) {
      node.id = uuid();
    }
    if (node.type === "box") {
      normalizeWeights(node);

      for (const child of node.children) {
        validateNode(child);
      }
    }
  }
  return layout;
}

function normalizeWeights(box: DockBoxDefinition) {
  // Normalize ratio
  let weightSum = 0;
  for (const child of box.children) {
    weightSum += child.weight || 1;
  }
  const weightFactor = box.children.length / weightSum;
  for (const child of box.children) {
    child.weight = (child.weight || 1) * weightFactor;
  }
}

export function findNode(layout: DockLayoutDefinition, nodeId: Id) {
  if (layout.root === null) {
    return undefined;
  }

  return findNode(layout.root);

  function findNode(node: DockNodeDefinition): DockNodeDefinition | undefined {
    if (node.id === nodeId) {
      return node;
    }
    if (node.type === "panel") {
      return undefined;
    }
    for (const child of node.children) {
      const foundChild = findNode(child);
      if (foundChild !== undefined) {
        return foundChild;
      }
    }
    return undefined;
  }
}

function findParent(layout: DockLayoutDefinition, id: Id): DockBoxDefinition | "root" | undefined {
  if (layout.root === null) {
    return undefined;
  }
  if (layout.root.id === id) {
    return "root";
  }
  return findParentInNode(layout.root);

  function findParentInNode(node: DockNodeDefinition): DockBoxDefinition | undefined {
    if (node.type === "panel") {
      return undefined;
    }
    for (const child of node.children) {
      if (child.id === id) {
        return node;
      }
      const foundParent = findParentInNode(child);
      if (foundParent !== undefined) {
        return foundParent;
      }
    }
    return undefined;
  }
}

function getChildIndex(box: DockBoxDefinition, nodeId: Id) {
  return box.children.findIndex(node => node.id === nodeId);
}

export function movePanel(layout: DockLayoutDefinition, srcId: Id, dstId: "root" | Id, region: Region) {
  if (layout.root === null) {
    return;
  }
  // Ignore if node is the same;
  if (srcId === dstId) {
    return;
  }

  // Get src panel
  const srcNode = findNode(layout, srcId);
  if (srcNode === undefined || srcNode.type !== "panel") {
    return;
  }

  // Remove src from old location
  removeNode(layout, srcNode);

  // Add src to new location
  const direction: Direction = region === "left" || region === "right" ? "row" : "col";
  const insertBefore = region === "left" || region === "top";

  if (dstId === "root") {
    const root = layout.root;
    if (root.type === "box" && root.direction === direction) {
      srcNode.weight = 1;
      const insertIndex = insertBefore ? 0 : root.children.length;
      root.children.splice(insertIndex, 0, srcNode);
      normalizeWeights(root);
    }
    else {
      srcNode.weight = 1;
      root.weight = 1;
      const newBox: DockBoxDefinition = {
        id: uuid(),
        weight: 1,
        type: "box",
        direction: direction,
        children: insertBefore ? [srcNode, root] : [root, srcNode],
      }
      layout.root = newBox;
    }
  }
  else {
    const parent = findParent(layout, dstId);
    const dstNode = findNode(layout, dstId);
    if (parent === undefined || dstNode === undefined) {
      return;
    }
    if (parent === "root") {
      srcNode.weight = 1;
      dstNode.weight = 1;
      const newBox: DockBoxDefinition = {
        id: uuid(),
        weight: 1,
        type: "box",
        direction: direction,
        children: insertBefore ? [srcNode, dstNode] : [dstNode, srcNode],
      }
      layout.root = newBox;
    }
    else if (parent.direction === direction) {
      const dstIndex = getChildIndex(parent, dstId);
      const halfWeight = dstNode.weight! / 2;
      srcNode.weight = halfWeight;
      dstNode.weight = halfWeight;
      const insertIndex = dstIndex + (insertBefore ? 0 : 1);
      parent.children.splice(insertIndex, 0, srcNode);
    }
    else {
      const dstIndex = getChildIndex(parent, dstId);
      srcNode.weight = 1;
      dstNode.weight = 1;
      const newBox: DockBoxDefinition = {
        id: uuid(),
        weight: dstNode.weight,
        type: "box",
        direction: direction,
        children: insertBefore ? [srcNode, dstNode] : [dstNode, srcNode],
      }
      parent.children.splice(dstIndex, 1, newBox);
    }
  }
}

function removeNode(layout: DockLayoutDefinition, node: DockNodeDefinition) {
  const parent = findParent(layout, node.id!);
  if (parent === undefined) {
    return;
  }
  if (parent === "root") {
    layout.root = null;
  }
  else {
    const index = getChildIndex(parent, node.id!);
    parent.children.splice(index, 1);

    // Collapse box if only one child remains.
    if (parent.children.length === 1) {
      collapseBox(layout, parent, parent.children[0]);
    }
    else {
      parent.children[index - (index < parent.children.length ? 0 : 1)].weight! += node.weight!;
      normalizeWeights(parent);
    }
  }
}

function collapseBox(layout: DockLayoutDefinition, oldNode: DockNodeDefinition, newNode: DockNodeDefinition) {
  const parent = findParent(layout, oldNode.id!);
  if (parent === undefined) {
    return;
  }
  if (parent === "root") {
    layout.root = newNode;
  }
  else {
    const index = getChildIndex(parent, oldNode.id!);
    newNode.weight = oldNode.weight;
    parent.children.splice(index, 1, newNode);
    normalizeWeights(parent);
  }
}

export type Region = "left" | "right" | "top" | "bottom" | "center";

export const calculateRegionPercent = (pos: Vector2, rect: DOMRect, distance: number = 0.25) => calculateRegion(
  (pos.x - rect.x) / rect.width,
  (rect.right - pos.x) / rect.width,
  (pos.y - rect.y) / rect.height,
  (rect.bottom - pos.y) / rect.height,
  distance
);

export const calculateRegionAbsolute = (pos: Vector2, rect: DOMRect, distance: number = 8) => calculateRegion(
  pos.x - rect.x,
  rect.width - (pos.x - rect.x),
  pos.y - rect.y,
  rect.height - (pos.y - rect.y),
  distance
);

function calculateRegion(left: number, right: number, top: number, bottom: number, distance: number) {
  let region: Region = "center";
  // Left region
  if (left < distance) {
    if (top < distance) {
      region = left < top ? "left" : "top";
    }
    else if (bottom < distance) {
      region = left < bottom ? "left" : "bottom";
    }
    else {
      region = "left";
    }
  }
  // Right region
  else if (right < distance) {
    if (top < distance) {
      region = right < top ? "right" : "top";
    }
    else if (bottom < distance) {
      region = right < bottom ? "right" : "bottom";
    }
    else {
      region = "right";
    }
  }
  // Top region
  else if (top < distance) {
    region = "top";
  }
  // Bottom region
  else if (bottom < distance) {
    region = "bottom";
  }
  return region;
}

export function calculateRegionRect(rect: DOMRect, region: Region) {
  const indicatorRect = {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  }
  if (region === "right") {
    indicatorRect.x += rect.width / 2;
  }
  else if (region === "bottom") {
    indicatorRect.y += rect.height / 2;
  }
  if (region === "left" || region === "right") {
    indicatorRect.width /= 2;
  }
  else if (region === "top" || region === "bottom") {
    indicatorRect.height /= 2;
  }
  return indicatorRect;
}