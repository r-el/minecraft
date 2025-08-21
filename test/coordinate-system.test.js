import { Cell } from "../models/Cell.js";

// Test the new coordinate system
console.log("Testing new coordinate system (Y=0 at bottom, increases upward):\n");

// Test basic coordinates
const grassCell = new Cell(10, 18); // x=10, y=18 (grass level)
console.log(`Grass cell: ${grassCell.toString()}`);

// Test tree growth (upward)
const trunkCells = grassCell.getTopCells(5); // Tree trunk growing up
console.log("Tree trunk cells (growing upward):");
trunkCells.forEach((cell, i) => {
  console.log(`  Trunk level ${i + 1}: ${cell.toString()}`);
});

// Test leaves at top of tree
const topCell = trunkCells[trunkCells.length - 1];
const leafRow = topCell.getRowWithSides(2); // Leaves around top
console.log("\nLeaf row at tree top:");
leafRow.forEach((cell) => {
  console.log(`  Leaf: ${cell.toString()}`);
});

// Test coordinate boundaries
console.log("\nCoordinate system boundaries:");
console.log(`Bottom-left corner: ${new Cell(0, 0).toString()} (bedrock)`);
console.log(`Bottom-right corner: ${new Cell(99, 0).toString()} (bedrock)`);
console.log(`Top-left corner: ${new Cell(0, 29).toString()} (sky)`);
console.log(`Top-right corner: ${new Cell(99, 29).toString()} (sky)`);
console.log(`Stone level: y=1 to y=13`); // TODO: make dynamic
console.log(`Dirt level: y=14 to y=17`); // TODO: make dynamic
console.log(`Grass level: y=18`); // TODO: make dynamic
