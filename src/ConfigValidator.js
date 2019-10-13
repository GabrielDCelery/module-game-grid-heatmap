class ConfigValidator {
  static _iValidInteger({ what, value }) {
    if (!Number.isInteger(value) || value <= 0) {
      return `${what} should be a valid integer that is greater than 0, instead received ${value}`;
    }

    return null;
  }

  static _isDivisible({ what, withWhat, whatValue, withWhatValue }) {
    if (whatValue % withWhatValue !== 0) {
      return `${what} should be divisible with ${withWhat}`;
    }

    return null;
  }

  static validate({ mapWidth, mapHeight, zoneSizeX, zoneSizeY }) {
    const messages = [
      ConfigValidator._iValidInteger({ what: 'mapWidth', value: mapWidth }),
      ConfigValidator._iValidInteger({ what: 'mapHeight', value: mapHeight }),
      ConfigValidator._iValidInteger({ what: 'zoneSizeX', value: zoneSizeX }),
      ConfigValidator._iValidInteger({ what: 'zoneSizeY', value: zoneSizeY }),
      ConfigValidator._isDivisible({
        what: 'mapWidth',
        withWhat: 'zoneSizeX',
        whatValue: mapWidth,
        withWhatValue: zoneSizeX
      }),
      ConfigValidator._isDivisible({
        what: 'mapHeight',
        withWhat: 'zoneSizeY',
        whatValue: mapHeight,
        withWhatValue: zoneSizeY
      })
    ];

    const filteredMessages = messages.filter(message => message !== null);

    if (filteredMessages.length > 0) {
      throw new Error(filteredMessages.join('\r\n'));
    }

    return null;
  }
}

module.exports = ConfigValidator;
