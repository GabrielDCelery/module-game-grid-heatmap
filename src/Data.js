let whatIndexes = {};
let whatInitialValues = {};

class Data {
  constructor() {
    const whats = Object.keys(whatIndexes);
    this.values = new Array(whats.length).fill(null);

    whats.forEach(what => {
      this.values[whatIndexes[what]] = Object.prototype.hasOwnProperty.call(
        whatInitialValues,
        what
      )
        ? whatInitialValues[what]
        : null;
    });
  }

  has(what) {
    return this.values[whatIndexes[what]] > 0;
  }

  get(what) {
    return this.values[whatIndexes[what]];
  }

  add({ what, amount }) {
    this.values[whatIndexes[what]] += amount;
  }

  set({ what, amount }) {
    this.values[whatIndexes[what]] = amount;
  }

  reset(whatOrWhats) {
    if (Array.isArray(whatOrWhats)) {
      return whatOrWhats.forEach(what => {
        this.values[whatIndexes[what]] = whatInitialValues[what];
      });
    }

    if (typeof whatOrWhats === 'string') {
      this.values[whatIndexes[whatOrWhats]] = whatInitialValues[whatOrWhats];

      return null;
    }

    return Object.keys(whatIndexes).forEach(what => {
      this.values[whatIndexes[what]] = whatInitialValues[what];
    });
  }

  static setConfig(totrackConfigs) {
    whatIndexes = {};
    whatInitialValues = {};
    totrackConfigs.forEach(({ name, initialValue }, index) => {
      whatIndexes[name] = index;
      whatInitialValues[name] = initialValue || 0;
    });
  }
}

module.exports = Data;
