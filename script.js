const container = document.getElementById("container");
for (let row = 0; row < 30; row++) {
  for (let col = 0; col < 100; col++) {
    const tile = document.createElement("div");

    if (row == 11) { // grass
      tile.style.backgroundImage = "url('assets/images/blocks/grass.webp')";
      tile.style.backgroundSize = 'cover';
    } else if (row >= 12 && row <= 15) { // Dirt
      tile.style.backgroundImage = "url('assets/images/blocks/dirt.webp')";
      tile.style.backgroundSize = 'cover';
    } else if (row >= 16 && row <= 28) { // Stone
      tile.style.backgroundImage = "url('assets/images/blocks/stone.webp')";
      tile.style.backgroundSize = 'cover';
    } else if (row >= 29) { // bedrock
      tile.style.backgroundImage = "url('assets/images/blocks/bedrock.webp')";
      tile.style.backgroundSize = 'cover';
    }

    container.appendChild(tile);
  }
}
