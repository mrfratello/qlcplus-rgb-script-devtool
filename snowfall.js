/*
  Q Light Controller Plus
  snowfall.js

  Copyright (c) John Syomochkin

  Licensed under the Apache License, Version 2.0 (the 'License');
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an 'AS IS' BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

(function () {
  var SNOW_COLOR = 0x007fff;

  function initialMap(height, width) {
    var map = new Array(height);
    for (var y = 0; y < height; y++) {
      map[y] = new Array(width);

      for (var x = 0; x < width; x++) {
        map[y][x] = 0;
      }
    }
    return map;
  }

  var colorPalette = new Object();
  colorPalette.collection = new Array(
    ['White', 0xffffff], //  0
    ['Cream', 0xffff7f], //  1
    ['Pink', 0xff7f7f], //  2
    ['Rose', 0x7f3f3f], //  3
    ['Coral', 0x7f3f1f], //  4
    ['Dim Red', 0x7f0000], //  5
    ['Red', 0xff0000], //  6
    ['Orange', 0xff3f00], //  7
    ['Dim Orange', 0x7f1f00], //  8
    ['Goldenrod', 0x7f3f00], //  9
    ['Gold', 0xff7f00], // 10
    ['Yellow', 0xffff00], // 11
    ['Dim Yellow', 0x7f7f00], // 12
    ['Lime', 0x7fff00], // 13
    ['Pale Green', 0x3f7f00], // 14
    ['Dim Green', 0x007f00], // 15
    ['Green', 0x00ff00], // 16
    ['Seafoam', 0x00ff3f], // 17
    ['Turquoise', 0x007f3f], // 18
    ['Teal', 0x007f7f], // 19
    ['Cyan', 0x00ffff], // 20
    ['Electric Blue', 0x007fff], // 21
    ['Blue', 0x0000ff], // 22
    ['Dim Blue', 0x00007f], // 23
    ['Pale Blue', 0x1f1f7f], // 24
    ['Indigo', 0x1f00bf], // 25
    ['Purple', 0x3f00bf], // 26
    ['Violet', 0x7f007f], // 27
    ['Magenta', 0xff00ff], // 28
    ['Hot Pink', 0xff003f], // 29
    ['Deep Pink', 0x7f001f], // 30
    ['Black', 0x000000]
  ); // 31

  colorPalette.makeSubArray = function (_index) {
    var _array = new Array();
    for (var i = 0; i < colorPalette.collection.length; i++) {
      _array.push(colorPalette.collection[i][_index]);
    }
    return _array;
  };
  colorPalette.names = colorPalette.makeSubArray(0);

  var algo = new Object();
  algo.apiVersion = 2;
  algo.name = 'Snow Fall';
  algo.author = 'John Syomochkin';

  algo.acceptColors = 1;
  algo.properties = new Array();
  algo.presetSize = 1;
  algo.properties.push(
    'name:presetSize|type:range|display:Size|values:1,20|write:setSize|read:getSize'
  );
  algo.presetNumber = 5;
  algo.properties.push(
    'name:presetNumber|type:range|display:Number|values:1,5|write:setNumber|read:getNumber'
  );
  algo.presetCollision = 0;
  algo.properties.push(
    'name:presetCollision|type:list|display:Self Collision|values:No,Yes|write:setCollision|read:getCollision'
  );
  algo.color1Index = 0;
  algo.properties.push(
    'name:color1Index|type:list|display:Color 1|' +
      'values:' +
      colorPalette.names.toString() +
      '|' +
      'write:setColor1|read:getColor1'
  );
  algo.color2Index = 6;
  algo.properties.push(
    'name:color2Index|type:list|display:Color 2|' +
      'values:' +
      colorPalette.names.toString() +
      '|' +
      'write:setColor2|read:getColor2'
  );
  algo.color3Index = 16;
  algo.properties.push(
    'name:color3Index|type:list|display:Color 3|' +
      'values:' +
      colorPalette.names.toString() +
      '|' +
      'write:setColor3|read:getColor3'
  );
  algo.color4Index = 22;
  algo.properties.push(
    'name:color4Index|type:list|display:Color 4|' +
      'values:' +
      colorPalette.names.toString() +
      '|' +
      'write:setColor4|read:getColor4'
  );
  algo.color5Index = 7;
  algo.properties.push(
    'name:color5Index|type:list|display:Color 5|' +
      'values:' +
      colorPalette.names.toString() +
      '|' +
      'write:setColor5|read:getColor5'
  );
  algo.presetSize = 5;

  algo.colorIndex = new Array(
    algo.color1Index,
    algo.color2Index,
    algo.color3Index,
    algo.color4Index,
    algo.color5Index
  );

  algo.initialized = false;

  algo.setSize = function (_size) {
    algo.presetSize = _size;
  };
  algo.getSize = function () {
    return algo.presetSize;
  };

  algo.setNumber = function (_step) {
    algo.presetNumber = _step;
    algo.initialized = false;
  };
  algo.getNumber = function () {
    return algo.presetNumber;
  };
  algo.setCollision = function (_colision) {
    if (_colision === 'Yes') {
      algo.presetCollision = 0;
    } else if (_colision === 'No') {
      algo.presetCollision = 1;
    }
  };
  algo.getCollision = function () {
    if (algo.presetCollision === 0) {
      return 'Yes';
    } else if (algo.presetCollision === 1) {
      return 'No';
    }
  };

  algo.setColor = function (_index, _preset) {
    var i = colorPalette.names.indexOf(_preset);
    if (i === -1) {
      i = colorPalette.collection.length - 1;
    }
    algo.colorIndex[_index] = i;
    return algo.colorIndex[_index];
  };
  algo.getColor = function (_index) {
    var i = algo.colorIndex[_index];
    if (i < 0) {
      i = 0;
    }
    if (i >= colorPalette.collection.length) {
      i = colorPalette.collection.length - 1;
    }
    return colorPalette.collection[i][0];
  };

  algo.setColor1 = function (_preset) {
    algo.color1Index = algo.setColor(0, _preset);
    algo.initialized = false;
  };
  algo.getColor1 = function () {
    return algo.getColor(0);
  };

  algo.setColor2 = function (_preset) {
    algo.color2Index = algo.setColor(1, _preset);
    algo.initialized = false;
  };
  algo.getColor2 = function () {
    return algo.getColor(1);
  };

  algo.setColor3 = function (_preset) {
    algo.color3Index = algo.setColor(2, _preset);
    algo.initialized = false;
  };
  algo.getColor3 = function () {
    return algo.getColor(2);
  };

  algo.setColor4 = function (_preset) {
    algo.color4Index = algo.setColor(3, _preset);
    algo.initialized = false;
  };
  algo.getColor4 = function () {
    return algo.getColor(3);
  };

  algo.setColor5 = function (_preset) {
    algo.color5Index = algo.setColor(4, _preset);
    algo.initialized = false;
  };
  algo.getColor5 = function () {
    return algo.getColor(4);
  };

  var util = new Object();

  util.initialize = function (width, height) {
    algo.snows = new Array();

    for (var i = 0; i < Math.floor((width * height) / 4); i++) {
      var maxTact = Math.ceil(Math.random() * 3) * 3;
      var result = new Object();
      result.x = Math.floor(Math.random() * width);
      result.y = Math.floor(Math.random() * (height - 1));
      result.maxTact = maxTact;
      result.tact = maxTact;
      algo.snows.push(result);
    }
    algo.initialized = true;
    return;
  };

  algo.rgbMap = function (width, height, rgb, progstep) {
    if (algo.initialized === false) {
      util.initialize(width, height);
    }

    var map = initialMap(height, width);
    for (var i = 0; i < algo.snows.length; i++) {
      var snow = algo.snows[i];
      var x = snow.x;
      var y = snow.y;
      var tact = snow.tact;
      var maxTact = snow.maxTact;
      if (!tact) {
        y += 1;
        tact = maxTact;
      } else {
        tact -= 1;
      }
      if (y >= height) {
        y = 0;
        x = Math.floor(Math.random() * width);
      }
      var newSnow = new Object();
      newSnow.x = x;
      newSnow.y = y;
      newSnow.tact = tact;
      newSnow.maxTact = maxTact;
      algo.snows[i] = newSnow;

      map[y][x] = SNOW_COLOR;
    }
    return map;
  };

  algo.rgbMapStepCount = function (width, height) {
    // This make no difference to the script ;-)
    return 2;
  };

  return algo;
})();
