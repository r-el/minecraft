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
      // Calculate the y position for this row based on the leaf level and thickness
      const y = centerCell.y + (leafLevel * rowThickness + repeatIdx);
      rows.push(baseRow.map(({ x }) => new Cell(x, y)));
    }
  }

  return rows;
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
