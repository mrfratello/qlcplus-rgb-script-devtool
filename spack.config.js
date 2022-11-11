const { config } = require('@swc/core/spack');
const spawn = require('cross-spawn');
const { parse, resolve } = require('path');

const result = spawn.sync('ls', ['src/scripts/*.js'], {
  shell: true,
});

const entry = result.stdout
  .toString()
  .split('\n')
  .slice(0, -1)
  .reduce((acc, path) => {
    acc[parse(path).name] = resolve(__dirname, path);
    return acc;
  }, {});

module.exports = config({
  entry,
  output: {
    path: resolve(__dirname, 'dist/scripts'),
  },
});
