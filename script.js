import { addRandomTrees } from "./utils/treeGenerator.js";

// Create all the tiles
function createTiles(container) {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 100; col++) {
      const tile = document.createElement("div");
      // New coordinate system:
      // Y=0 is bottom row, increases upward
      // X is column (left to right)
      const x = col;
      const y = 29 - row; // Convert row to Y coordinate (bottom-up)
      tile.id = `${y},${x}`;
      tile.classList.add("cell");

      // grass (y=18 from bottom, which is the grass level)
      if (y == 18) tile.classList.add("grass");
      // Dirt  
      else if (y >= 14 && y <= 17) tile.classList.add("dirt");
      // Stone
      else if (y >= 1 && y <= 13) tile.classList.add("stone");
      // bedrock
      else if (y == 0) tile.classList.add("bedrock");

      container.appendChild(tile);
    }
  }
}

const container = document.getElementById("container");
createTiles(container);

const inventory = {
  grass: 0,
  dirt: 0,
  stone: 0,
  bedrock: 0,
};

// Add event listeners to each tile
function addEventListenersToTiles(container) {
  const tiles = container.querySelectorAll("div");

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const classes = Array.from(tile.classList);
      classes.forEach((cls) => {
        if (inventory.hasOwnProperty(cls)) {
          inventory[cls]++;
          tile.classList.remove(cls);
        }
      });
      console.log("Updated counters:", inventory);
    });
  });
}

addEventListenersToTiles(container);

// Add random trees with proper spacing using new coordinate system
addRandomTrees(10, {
  grassY: 18, // Updated grass level
  gridWidth: 100,
  minDistance: 10,
  maxAttempts: 100
});
