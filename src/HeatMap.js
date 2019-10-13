const Data = require('./Data');
const NoWrapAroundDistanceMapper = require('./NoWrapAroundDistanceMapper');
const WrapAroundDistanceMapper = require('./WrapAroundDistanceMapper');

class HeatMap {
  constructor({ mapWidth, mapHeight, zoneSizeX, zoneSizeY, isWrapAround }) {
    const zoneWidth = mapWidth / zoneSizeX;
    const zoneHeight = mapHeight / zoneSizeY;

    this.data = new Array(zoneWidth)
      .fill(null)
      .map(() => new Array(zoneHeight).fill(null));

    for (let x = 0, xMax = zoneWidth; x < xMax; x += 1) {
      for (let y = 0, yMax = zoneHeight; y < yMax; y += 1) {
        this.data[x][y] = new Data();
      }
    }

    const distanceMapperConfig = {
      width: zoneWidth,
      height: zoneHeight
    };

    this.distanceMapper =
      isWrapAround === true
        ? new WrapAroundDistanceMapper(distanceMapperConfig)
        : new NoWrapAroundDistanceMapper(distanceMapperConfig);
  }
}

module.exports = HeatMap;
