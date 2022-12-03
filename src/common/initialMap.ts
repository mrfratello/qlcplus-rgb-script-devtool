export function initialMap(height: number, width: number, color = 0) {
  const map: number[][] = new Array(height);
  for (let y = 0; y < height; y++) {
    map[y] = new Array(width);
    for (let x = 0; x < width; x++) {
      map[y][x] = color;
    }
  }
  return map;
}
