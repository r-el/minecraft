import { Cell } from "../models/Cell.js";

/**
 * Generates an array of leaf cells arranged in rows around a central cell.
 *
 * @param {Cell} centerCell - The central cell from which the leaves spread
 * @param {number} leafDepth - Number of leaf layers to generate
 * @param {number} [rowThickness=2] - Number of rows to repeat for each leaf layer
 * @returns {Cell[][]} A matrix of cells representing the leaf structure
 *
 * Each leaf layer expands at an increasing distance from the center, and the row thickness allows
 * for vertical density of the leaves.
 */
export function getLeafMatrix(centerCell, leafDepth, rowThickness = 2) {
  const rows = [];

  for (let leafLevel = 0; leafLevel < leafDepth; leafLevel++) {
    // Generate the base row for this leaf level
    const baseRow = centerCell.getRowWithSides(leafLevel + 1);

    // Repeat the base row vertically for the specified thickness
    for (let repeatIdx = 0; repeatIdx < rowThickness; repeatIdx++) {
      // Calculate the y position for this row - UPWARD from center (increasing Y)
      const y = centerCell.y + (leafLevel * rowThickness + repeatIdx);
      rows.push(baseRow.map(({ x }) => new Cell(x, y)));
    }
  }

  return rows;
}

/**
 * Generates an array of leaf cells arranged in rows around a central cell.
 * @param {Cell} centerCell - The central cell from which the leaves spread
 * @param {number} leafDepth - Number of leaf layers to generate
 * @param {number} [rowThickness=2] - Number of rows to repeat for each leaf layer
 * @returns {Cell[]} An array of cells representing the leaf structure
 * Each leaf layer expands at an increasing distance from the center, and the row thickness allows
 * for vertical density of the leaves.
 */
export function getLeafCells(centerCell, leafDepth, rowThickness = 2) {
  const leafMatrix = getLeafMatrix(centerCell, leafDepth, rowThickness);
  return leafMatrix.flat(); // Flatten the matrix into a single array of cells
}

/**
 * Generates an array of trunk cells arranged vertically from a base cell.
 *
 * @param {Cell} baseCell - The bottom cell of the trunk (usually on grass level)
 * @param {number} trunkHeight - Height of the trunk in cells
 * @returns {Cell[]} An array of cells representing the trunk structure
 *
 * The trunk grows upward from the base cell, using the built-in getTopCells method.
 */
export function getTrunkColumn(baseCell, trunkHeight) {
  return baseCell.getTopCells(trunkHeight);
}

/**
 * Generates a matrix representation of trunk cells arranged vertically from a base cell.
 *
 * @param {Cell} baseCell - The bottom cell of the trunk (usually on grass level)
 * @param {number} trunkHeight - Height of the trunk in cells
 * @returns {Cell[][]} A matrix where each row contains one trunk cell
 *
 * Each row in the matrix contains a single trunk cell, making it compatible with
 * other matrix-based functions in the tree generation system.
 */
export function getTrunkMatrixRows(baseCell, trunkHeight) {
  const trunkCells = baseCell.getTopCells(trunkHeight);
  return trunkCells.map((cell) => [cell]);
}

/**
 * Creates a tree trunk at specified position
 */
function createTrunk(baseCell, height) {
  const trunkCells = getTrunkColumn(baseCell, height);

  trunkCells.forEach((cell) => {
    const element = document.getElementById(`${cell.y},${cell.x}`);
    if (element) {
      element.classList.remove("grass", "dirt", "stone", "oak-leaves");
      element.classList.add("oak-log");
    }
  });

  return trunkCells;
}

/**
 * Creates leaves around tree top
 */
function createLeaves(topCell, leafDepth = 3, leafThickness = 2) {
  const leafCells = getLeafCells(topCell, leafDepth, leafThickness);

  leafCells.forEach((cell) => {
    const element = document.getElementById(`${cell.y},${cell.x}`);
    if (element && cell.y <= 29) {
      // Check upper bound instead of lower
      element.classList.remove("grass", "dirt", "stone");
      element.classList.add("oak-leaves");
    }
  });

  return leafCells;
}

/**
 * Creates one complete tree
 */
function createTree(x, grassY = 18) {
  // Grass now hardcoded in level 18 TODO: make it dynamic
  const trunkHeight = 3 + Math.floor(Math.random() * 3); // 3-5 blocks
  const baseCell = new Cell(x, grassY); // Start from grass level

  // Create trunk above grass
  const trunkCells = createTrunk(baseCell, trunkHeight);

  // Create leaves from top of trunk
  const topCell = new Cell(x, grassY + trunkHeight); // Add height instead of subtract
  const leafCells = createLeaves(topCell, 2, 1);

  return { x, trunkHeight, trunkCells, leafCells };
}

/**
 * Checks if tree position has enough space
 */
function hasValidPosition(x, existingTrees, minDistance = 8) {
  return !existingTrees.some((treeX) => Math.abs(treeX - x) < minDistance);
}

/**
 * Adds random trees with proper spacing
 */
export function addRandomTrees(treeCount = 5, options = {}) {
  const {
    grassY = 18, // Changed from 11 to 18
    gridWidth = 100,
    minDistance = 8,
    maxAttempts = 50,
  } = options;

  const trees = [];
  let attempts = 0;

  while (trees.length < treeCount && attempts < maxAttempts) {
    attempts++;

    // Generate random position
    const x = Math.floor(Math.random() * gridWidth);

    // Check if position is valid (not too close to existing trees)
    if (
      hasValidPosition(
        x,
        trees.map((tree) => tree.x),
        minDistance
      )
    ) {
      const tree = createTree(x, grassY);
      trees.push(tree);

      console.log(`Tree ${trees.length} created at x=${x}, height=${tree.trunkHeight}`);
    }
  }

  console.log(`Added ${trees.length} trees to the grid (${attempts} attempts)`);
  return trees;
}
