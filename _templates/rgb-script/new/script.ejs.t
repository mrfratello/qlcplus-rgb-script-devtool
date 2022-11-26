---
to: src/scripts/<%= name.split(' ').join('').toLowerCase() %>.js
filename: <%= name.split(' ').join('').toLowerCase() %>
---
/*
  Q Light Controller Plus
  <%= attributes.filename %>.js

  Copyright (c) <%= author %>

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
<% if (isUseInitialMap) { %>
import { initialMap } from '../common/initialMap';
<% } -%>

let testAlgo; // development tool access
fakeSideEffect(testAlgo); // need so `testAlgo` is not deleted by tree shaking

(() => {
  const algo = {
    apiVersion: 2,
    name: '<%= name %>',
    author: '<%= author %>',
    acceptColors: <%= acceptColors %>,
    properties: [],
    <%_ if (isUseInitialState) { -%>
    initialized: false,
    <%_ } -%>
  };

  <%_ if (isUseInitialState) { -%>
  const util = {
    initialize(width, height) {
      if (algo.initialized) {
        return;
      }
      /* TODO write initial state */
      algo.initialized = true;
    }
  };
  <%_ } -%>

  algo.rgbMap = (width, height, rgb, step) => {
    <%_ if (isUseInitialState) { -%>
    util.initialize(width, height);

    <%_ } -%>
    <%_ if (isUseInitialMap) { -%>
    const map = initialMap(height, width);
    <%_ } else { -%>
    let map;
    <%_ } -%>

    /* TODO write script */
    
    return map;
  };

  algo.rgbMapStepCount = (width, height) => {
    /* TODO write number of steps as a constant or as a dependence on the width and height of the matrix */
    return 1;
  };
  
  testAlgo = algo; // development tool access

  return algo;
})();

console.log(testAlgo);
