const Data = require('./Data');

class Cells {
  constructor({ mapWidth, mapHeight, zoneWidth, zoneSizeY }) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.data = new Array(this.mapWidth)
      .fill(null)
      .map(() => new Array(this.mapHeight).fill(null));
    this.zoneCoordinatesMap = new Array(this.mapWidth)
      .fill(null)
      .map(() => new Array(this.mapHeight).fill(null));

    for (let x = 0, xMax = this.mapWidth; x < xMax; x += 1) {
      for (let y = 0, yMax = this.mapHeight; y < yMax; y += 1) {
        this.data[x][y] = new Data();
        this.zoneCoordinatesMap[x][y] = [
          Math.floor(x / zoneWidth),
          Math.floor(y / zoneSizeY)
        ];
      }
    }
  }

  has({ x, y, what }) {
    return this.data[x][y].has(what);
  }

  get({ x, y, what }) {
    return this.data[x][y].get(what);
  }

  add({ x, y, what, amount }) {
    return this.data[x][y].add({ what, amount });
  }

  set({ x, y, what, amount }) {
    return this.data[x][y].set({ what, amount });
  }

  getZoneCoordinates({ x, y }) {
    const [zoneX, zoneY] = this.zoneCoordinatesMap[x][y];

    return {
      x: zoneX,
      y: zoneY
    };
  }

  reset(whatOrWhats) {
    for (let x = 0, xMax = this.mapWidth; x < xMax; x += 1) {
      for (let y = 0, yMax = this.mapHeight; y < yMax; y += 1) {
        this.data[x][y].reset(whatOrWhats);
      }
    }
  }
}

module.exports = Cells;
