function createTiles(container) {
  for (let row = 0; row < 30; row++) {
    for (let col = 0; col < 100; col++) {
      const tile = document.createElement("div");

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
