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
      tile.classList.add("cell");

      // grass
      if (row === 11) tile.classList.add("grass");
      // Dirt
      else if (row >= 12 && row <= 15) tile.classList.add("dirt");
      // Stone
      else if (row >= 16 && row <= 28) tile.classList.add("stone");
      // bedrock
      else if (row >= 29) tile.classList.add("bedrock");
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

// Change the cursor style based on the selected tool
function changeCursor(selectedTool) {
  if (selectedTool) {
    container.style.cursor = `url(./assets/images/cursor/${selectedTool}.png), default`;
  } else {
    container.style.cursor = "default";
  }
}
