import { addRandomTrees } from "./utils/treeGenerator.js";

let selectedTool = "";
document.querySelectorAll("#tools button").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedTool = btn.dataset.tool;
    changeCursor(selectedTool);
    console.log("Select Tool:", selectedTool);
  });
});

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
      tile.addEventListener("click", () => {
        clickTool(tile);
      });

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
  leaves: 0,
  oaklog: 0,
};

function clickTool(tile) {
  if (!selectedTool) {
    console.log("לא נבחר כלי");
    return;
  }

  if (selectedTool === "shovel" && tile.classList.contains("grass")) {
    inventory.grass += 1;
    tile.classList.remove("grass");
    console.log("כמות הפעמים", inventory.grass);
  }

  if (selectedTool === "shovel" && tile.classList.contains("dirt")) {
    inventory.dirt += 1;
    tile.classList.remove("dirt");
  }

  if (selectedTool === "pickaxe" && tile.classList.contains("stone")) {
    inventory.stone += 1;
    tile.classList.remove("stone");
  }

  if (selectedTool === "shears" && tile.classList.contains("leaves")) {
    inventory.leaves += 1;
    tile.classList.remove("leaves");
  }

  if (selectedTool === "axe" && tile.classList.contains("oaklog")) {
    inventory.oaklog += 1;
    tile.classList.remove("oaklog");
  }
}

function hideMenu() {
  const newGame = document.getElementById("newGame");
  const menu = document.getElementById("menu");
  newGame.addEventListener("click", (event) => {
    menu.classList.add("menuNone");
  });
}

function initGame() {
  container.textContent = "";
  selectedTool = "";
  changeCursor(selectedTool);
  createTiles(container);
  addRandomTrees(10, {
  grassY: 18, // Updated grass level
  gridWidth: 100,
  minDistance: 10,
  maxAttempts: 100
});
  hideMenu();
}

newGame.addEventListener("click", initGame());
newWorld.addEventListener("click", () => initGame());

continueGame.addEventListener("click", () => {
  menu.classList.toggle("menuNone");
});

BackMenu.addEventListener("click", () => {
  menu.classList.toggle("menuNone");
});

// Change the cursor style based on the selected tool
function changeCursor(selectedTool) {
  if (selectedTool) {
    container.style.cursor = `url(./assets/images/cursor/${selectedTool}.png), default`;
  } else {
    container.style.cursor = "default";
  }
}

// Add random trees with proper spacing using new coordinate system
addRandomTrees(10, {
  grassY: 18, // Updated grass level
  gridWidth: 100,
  minDistance: 10,
  maxAttempts: 100
});
