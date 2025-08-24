import { addRandomTrees } from "./utils/treeGenerator.js";

let selectedTool = "";
let selectedItem = ""; // Track selected inventory item for placing

// Handle tool selection
document.querySelectorAll("#tools button").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedTool = btn.dataset.tool;
    selectedItem = ""; // Clear selected item when tool is selected
    changeCursor(selectedTool);
    console.log("Select Tool:", selectedTool);
  });
});

// Handle inventory item selection
document.querySelectorAll("#inventory button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.item;
    if (inventory[item] > 0) { // Only select if we have items
      selectedItem = item;
      selectedTool = ""; // Clear selected tool when item is selected
      changeCursor(selectedItem);
      console.log("Select Item:", selectedItem);
    }
  });
});

// Create all the tiles
function createTiles(container) {
  let tile = ""
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 100; col++) {
      tile = document.createElement("div");
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
  leaves: 0,
  oaklog: 0,
};

// Update inventory display
function updateInventoryDisplay() {
  document.querySelectorAll("#inventory button").forEach((btn) => {
    const item = btn.dataset.item;
    const countSpan = btn.querySelector(".item-count");
    countSpan.textContent = inventory[item];
    
    // Disable button if no items available
    btn.disabled = inventory[item] === 0;
  });
}

container.addEventListener("click", (event) => {
    clickTool(event.target);
});

function clickTool(tile) {
  // Handle placing items from inventory
  if (selectedItem) {
    // Check if tile is empty (no background class except basic cell)
    const hasBlock = tile.classList.length > 1; // More than just 'cell' class
    
    if (!hasBlock && inventory[selectedItem] > 0) {
      // Add the item class to the tile
      if (selectedItem === "oaklog") {
        tile.classList.add("oak-log");
      } else if (selectedItem === "leaves") {
        tile.classList.add("oak-leaves");
      } else {
        tile.classList.add(selectedItem);
      }
      
      // Reduce inventory count
      inventory[selectedItem] -= 1;
      updateInventoryDisplay();
      
      // Clear selection if no more items
      if (inventory[selectedItem] === 0) {
        selectedItem = "";
        changeCursor("");
      }
      
      console.log(`Placed ${selectedItem}, remaining: ${inventory[selectedItem]}`);
    }
    return;
  }

  // Handle tool usage (existing logic)
  if (!selectedTool) {
    console.log("לא נבחר כלי");
    return;
  }

  if (selectedTool === "shovel" && tile.classList.contains("grass")) {
    inventory.grass += 1;
    tile.classList.remove("grass");
    updateInventoryDisplay();
    console.log("כמות הפעמים", inventory.grass);
  }

  if (selectedTool === "shovel" && tile.classList.contains("dirt")) {
    inventory.dirt += 1;
    tile.classList.remove("dirt");
    updateInventoryDisplay();
  }

  if (selectedTool === "pickaxe" && tile.classList.contains("stone")) {
    inventory.stone += 1;
    tile.classList.remove("stone");
    updateInventoryDisplay();
  }

  if (selectedTool === "shears" && tile.classList.contains("oak-leaves")) {
    inventory.leaves += 1;
    tile.classList.remove("oak-leaves");
    updateInventoryDisplay();
  }

  if (selectedTool === "axe" && tile.classList.contains("oak-log")) {
    inventory.oaklog += 1;
    tile.classList.remove("oak-log");
    updateInventoryDisplay();
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
  selectedItem = "";
  changeCursor("");
  createTiles(container);
  updateInventoryDisplay();
  addRandomTrees(10, {
    grassY: 18, // Updated grass level
    gridWidth: 100,
    minDistance: 10,
    maxAttempts: 100,
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

// Change the cursor style based on the selected tool or item
function changeCursor(selected) {
  if (selectedTool) {
    container.style.cursor = `url(./assets/images/cursor/${selectedTool}.png), default`;
  } else if (selectedItem) {
    container.style.cursor = `url(./assets/images/cursor/${selectedItem}.png), default`;
  } else {
    container.style.cursor = "default";
  }
}
