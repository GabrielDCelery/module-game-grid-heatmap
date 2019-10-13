const ConfigValidator = require('./ConfigValidator');
const Data = require('./Data');
const Cells = require('./Cells');
const HeatMap = require('./HeatMap');
const NoWrapAroundDistanceMapper = require('./NoWrapAroundDistanceMapper');
const WrapAroundDistanceMapper = require('./WrapAroundDistanceMapper');

class GameMap {
  constructor(config) {
    ConfigValidator.validate(config);
    const {
      mapWidth,
      mapHeight,
      zoneSizeX,
      zoneSizeY,
      data,
      isWrapAround,
      maxDistance
    } = config;
    Data.setConfig(data);
    this.totals = new Data();
    this.cells = new Cells({ mapWidth, mapHeight, zoneSizeX, zoneSizeY });
    const distanceMapperConfig = {
      width: mapWidth,
      height: mapHeight,
      maxDistance
    };
    this.distanceMapper =
      isWrapAround === true
        ? new WrapAroundDistanceMapper(distanceMapperConfig)
        : new NoWrapAroundDistanceMapper(distanceMapperConfig);
    this.heatMap = new HeatMap({
      mapWidth,
      mapHeight,
      zoneSizeX,
      zoneSizeY,
      isWrapAround
    });
  }

  hasCell({ x, y, what }) {
    return this.cells.has({ x, y, what });
  }

  getCell({ x, y, what }) {
    return this.cells.get({ x, y, what });
  }

  addCell({ x, y, what, amount }) {
    this.cells.add({ x, y, what, amount });
    this.totals.add({ what, amount });
  }

  setCell({ x, y, what, amount }) {
    this.cells.set({ x, y, what, amount });
    this.totals.set({ what, amount });
  }

  getZoneCoordinatesForCell({ x, y }) {
    return this.cells.getZoneCoordinates({ x, y });
  }

  getCoordinatesAtDistance({ x, y, distance }) {
    return this.distanceMapper.getCoordinatesAtDistance({ x, y, distance });
  }

  resetData(whatOrWhats = null) {
    this.totals.reset(whatOrWhats);
    this.cells.reset(whatOrWhats);
  }

  resetHeatMap() {
    this.heatMap.reset();
  }
}

module.exports = GameMap;
