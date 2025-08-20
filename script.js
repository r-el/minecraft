let selectedTool = "";

// Create all the tiles
function createTiles(container) {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 100; col++) {
      const tile = document.createElement("div");
      tile.classList.add("cell");

      // grass
      if (row == 11) tile.classList.add("grass");
      // Dirt
      else if (row >= 12 && row <= 15) tile.classList.add("dirt");
      // Stone
      else if (row >= 16 && row <= 28) tile.classList.add("stone");
      // bedrock
      else if (row >= 29) tile.classList.add("bedrock");

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

// Change the cursor style based on the selected tool
function changeCursor(selectedTool) {
  if (selectedTool) {
    container.style.cursor = `url(./assets/images/cursor/${selectedTool}.png), default`;
  } else {
    container.style.cursor = "default";
  }
}

addEventListenersToTiles(container);
