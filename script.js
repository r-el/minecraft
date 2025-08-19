const container = document.getElementById("container");
for (let row = 0; row < 30; row++) {
  for (let col = 0; col < 100; col++) {
    const tile = document.createElement("div");

    if (row == 11) {
      // grass
      tile.classList.add("grass");
    } else if (row >= 12 && row <= 15) {
      // Dirt
      tile.classList.add("dirt");
    } else if (row >= 16 && row <= 28) {
      // Stone
      tile.classList.add("stone");
    } else if (row >= 29) {
      // bedrock
      tile.classList.add("bedrock");
    }

    container.appendChild(tile);
  }
}
