(function() {
  'use strict';

  let encoder = new TextEncoder('utf-8');
  let decoder = new TextDecoder('utf-8');


  class PlaybulbCandle {
    constructor() {
      this.device = null;
      this.server = null;
      this._characteristics = new Map();
      this._isEffectSet = false;
      this._debug = false;
    }
    request() {
      return navigator.bluetooth.requestDevice({
        filters: [ { name: '' },
        { namePrefix: '0' },
        { namePrefix: '1' },
        { namePrefix: '2' },
        { namePrefix: '3' },
        { namePrefix: '4' },
        { namePrefix: '5' },
        { namePrefix: '6' },
        { namePrefix: '7' },
        { namePrefix: '8' },
        { namePrefix: '9' },
        { namePrefix: 'a' },
        { namePrefix: 'b' },
        { namePrefix: 'c' },
        { namePrefix: 'd' },
        { namePrefix: 'e' },
        { namePrefix: 'f' },
        { namePrefix: 'g' },
        { namePrefix: 'h' },
        { namePrefix: 'i' },
        { namePrefix: 'j' },
        { namePrefix: 'k' },
        { namePrefix: 'l' },
        { namePrefix: 'm' },
        { namePrefix: 'n' },
        { namePrefix: 'o' },
        { namePrefix: 'p' },
        { namePrefix: 'q' },
        { namePrefix: 'r' },
        { namePrefix: 's' },
        { namePrefix: 't' },
        { namePrefix: 'u' },
        { namePrefix: 'v' },
        { namePrefix: 'w' },
        { namePrefix: 'x' },
        { namePrefix: 'y' },
        { namePrefix: 'z' },
        { namePrefix: 'A' },
        { namePrefix: 'B' },
        { namePrefix: 'C' },
        { namePrefix: 'D' },
        { namePrefix: 'E' },
        { namePrefix: 'F' },
        { namePrefix: 'G' },
        { namePrefix: 'H' },
        { namePrefix: 'I' },
        { namePrefix: 'J' },
        { namePrefix: 'K' },
        { namePrefix: 'L' },
        { namePrefix: 'M' },
        { namePrefix: 'N' },
        { namePrefix: 'O' },
        { namePrefix: 'P' },
        { namePrefix: 'Q' },
        { namePrefix: 'R' },
        { namePrefix: 'S' },
        { namePrefix: 'T' },
        { namePrefix: 'U' },
        { namePrefix: 'V' },
        { namePrefix: 'W' },
        { namePrefix: 'X' },
        { namePrefix: 'Y' },
        { namePrefix: 'Z' }],
        optionalServices: ['generic_access']
      })
      .then(device => {
        this.device = device;
      })
    }
        /* Utils */

    _cacheCharacteristic(service, characteristicUuid) {
      return service.getCharacteristic(characteristicUuid)
      .then(characteristic => {
        this._characteristics.set(characteristicUuid, characteristic);
      });
    }
    _readCharacteristicValue(characteristicUuid) {
      let characteristic = this._characteristics.get(characteristicUuid);
      return characteristic.readValue()
      .then(value => {
        if (this._debug) {
          for (var i = 0, a = []; i < value.byteLength; i++) { a.push(value.getUint8(i)); }
          console.debug('READ', characteristic.uuid, a);
        }
        return value;
      });
    }
    _writeCharacteristicValue(characteristicUuid, value) {
      let characteristic = this._characteristics.get(characteristicUuid);
      if (this._debug) {
        console.debug('WRITE', characteristic.uuid, value);
      }
      return characteristic.writeValue(value);
    }
    _decodeString(data) {
      return decoder.decode(data);
    }
    _encodeString(data) {
      return encoder.encode(data);
    }
  }

  window.playbulbCandle = new PlaybulbCandle();

})();
