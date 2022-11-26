/*
  Q Light Controller Plus
  countdown.js

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
import { initialMap } from '../common/initialMap';
import { fakeSideEffect } from '../common/fakeSideEffect';

function dashCoords([y, x], yOffset) {
  return [
    [y + yOffset, x],
    [y + yOffset, x + 1],
    [y + yOffset, x + 2],
  ];
}

function pipeCoords([y, x], xOffset) {
  return [
    [y, x + xOffset],
    [y + 1, x + xOffset],
    [y + 2, x + xOffset],
    [y + 3, x + xOffset],
    [y + 4, x + xOffset],
    [y + 5, x + xOffset],
    [y + 6, x + xOffset],
  ];
}

function threeDashCoords(startCoord) {
  return [
    ...dashCoords(startCoord, 0),
    ...dashCoords(startCoord, 3),
    ...dashCoords(startCoord, 6),
  ];
}

function renderDigit(map, startCoord, digit, color) {
  const [y, x] = startCoord;
  const coords = [];
  switch (digit) {
    case 0:
      coords.push(
        ...dashCoords(startCoord, 0),
        ...dashCoords(startCoord, 6),
        ...pipeCoords(startCoord, 0),
        ...pipeCoords(startCoord, 2)
      );
      break;
    case 1:
      coords.push(...pipeCoords(startCoord, 2), [y + 2, x], [y + 1, x + 1]);
      break;
    case 2:
      coords.push(
        ...threeDashCoords(startCoord),
        [y + 1, x + 2],
        [y + 2, x + 2],
        [y + 4, x],
        [y + 5, x]
      );
      break;
    case 3:
      coords.push(...threeDashCoords(startCoord), ...pipeCoords(startCoord, 2));
      break;
    case 4:
      coords.push(
        ...pipeCoords(startCoord, 2),
        ...dashCoords(startCoord, 3),
        [y, x],
        [y + 1, x],
        [y + 2, x]
      );
      break;
    case 5:
      coords.push(
        ...threeDashCoords(startCoord),
        [y + 1, x],
        [y + 2, x],
        [y + 4, x + 2],
        [y + 5, x + 2]
      );
      break;
    case 6:
      coords.push(
        ...dashCoords(startCoord, 3),
        ...dashCoords(startCoord, 6),
        [y, x + 1],
        [y, x + 2],
        [y + 1, x],
        [y + 2, x],
        [y + 4, x],
        [y + 4, x + 2],
        [y + 5, x],
        [y + 5, x + 2]
      );
      break;
    case 7:
      coords.push(
        ...dashCoords(startCoord, 0),
        [y + 1, x + 2],
        [y + 2, x + 2],
        [y + 3, x + 1],
        [y + 4, x + 1],
        [y + 5, x + 1],
        [y + 6, x + 1]
      );
      break;
    case 8:
      coords.push(
        ...threeDashCoords(startCoord),
        ...pipeCoords(startCoord, 0),
        ...pipeCoords(startCoord, 2)
      );
      break;
    case 9:
      coords.push(
        ...dashCoords(startCoord, 0),
        ...dashCoords(startCoord, 3),
        [y + 1, x],
        [y + 1, x + 2],
        [y + 2, x],
        [y + 2, x + 2],
        [y + 4, x + 2],
        [y + 5, x + 2],
        [y + 6, x + 1],
        [y + 6, x]
      );
      break;
  }

  for (var i = 0; i < coords.length; i++) {
    const [yCurrent, xCurrent] = coords[i];
    map[yCurrent][xCurrent] = color;
  }
}

function getLast2Digits(n) {
  const lastDigit = n % 10;
  const penultimateDigit = (n - lastDigit) / 10;
  return [penultimateDigit, lastDigit];
}

let testAlgo;
fakeSideEffect(testAlgo);

(() => {
  var algo = new Object();
  algo.apiVersion = 2;
  algo.name = 'Countdown';
  algo.author = 'John Syomochkin';
  algo.acceptColors = 1;
  algo.properties = new Array();
  algo.initialized = false;

  var util = new Object();
  util.initialize = function (width, height) {
    algo.initialized = true;
    return;
  };

  algo.rgbMap = function (width, height, rgb, progstep) {
    if (algo.initialized === false) {
      util.initialize(width, height);
    }
    var map = initialMap(height, width, 0);

    const nowDate = new Date();

    const [firstHour, secondHour] = getLast2Digits(nowDate.getHours());

    renderDigit(map, [0, 0], firstHour, 0xffff7f);
    renderDigit(map, [0, 3], secondHour, 0x00ff3f);

    const [firstMinute, secondMinute] = getLast2Digits(nowDate.getMinutes());

    renderDigit(map, [8, 0], firstMinute, 0x00ffff);
    renderDigit(map, [8, 3], secondMinute, 0xff00ff);
    return map;
  };
  algo.rgbMapStepCount = function (width, height) {
    // This make no difference to the script ;-)
    return 10;
  };
  testAlgo = algo;
  return algo;
})();
