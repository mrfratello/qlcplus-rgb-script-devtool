/*
  Q Light Controller Plus
  heart.js

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
import { fakeSideEffect } from '../common/fakeSideEffect';
import { initialMap } from '../common/initialMap';

let testAlgo;
fakeSideEffect(testAlgo);

(() => {
  var PINK_COLOR = 0xff7f7f;

  function renderHeart(map, x, y, color) {
    map[y - 2][x - 1] = color;
    map[y - 2][x + 1] = color;
    map[y - 1][x - 2] = color;
    map[y - 1][x - 1] = color;
    map[y - 1][x] = color;
    map[y - 1][x + 1] = color;
    map[y - 1][x + 2] = color;
    // map[y][x - 2] = color;
    map[y][x - 1] = color;
    map[y][x] = color;
    map[y][x + 1] = color;
    // map[y][x + 2] = color;
    // map[y + 1][x - 1] = color;
    map[y + 1][x] = color;
    // map[y + 1][x + 1] = color;
    map[y + 2][x] = color;
    return map;
  }
  var algo = new Object();
  algo.apiVersion = 2;
  algo.name = 'Heart';
  algo.author = 'John Syomochkin';
  algo.acceptColors = 1;
  algo.properties = new Array();
  algo.initialized = false;
  var util = new Object();
  util.initialize = function (width, height) {
    algo.heart = new Object();
    algo.heart.x = Math.floor(Math.random() * (width - 4)) + 2;
    algo.heart.y = Math.floor(Math.random() * (height - 4)) + 2;
    algo.heart.xSpeed = 1;
    algo.heart.ySpeed = -1;
    algo.initialized = true;
    return;
  };
  algo.rgbMap = function (width, height, rgb, progstep) {
    if (algo.initialized === false) {
      util.initialize(width, height);
    }
    var map = initialMap(height, width);
    var x = algo.heart.x;
    var y = algo.heart.y;
    var xSpeed = algo.heart.xSpeed;
    var ySpeed = algo.heart.ySpeed;
    if (y + ySpeed < 2 || y + ySpeed > height - 3) {
      ySpeed *= -1;
    }
    if (x + xSpeed < 2 || x + xSpeed > width - 3) {
      xSpeed *= -1;
    }
    x += xSpeed;
    y += ySpeed;
    algo.heart.x = x;
    algo.heart.y = y;
    algo.heart.xSpeed = xSpeed;
    algo.heart.ySpeed = ySpeed;
    return renderHeart(map, x, y, rgb);
  };
  algo.rgbMapStepCount = function (width, height) {
    // This make no difference to the script ;-)
    return 1;
  };
  testAlgo = algo;

  return algo;
})();
