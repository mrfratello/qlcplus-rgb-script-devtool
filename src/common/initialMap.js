export function initialMap(height, width, color = 0) {
  var map = new Array(height);
  for (var y = 0; y < height; y++) {
    map[y] = new Array(width);
    for (var x = 0; x < width; x++) {
      map[y][x] = color;
    }
  }
  return map;
}
