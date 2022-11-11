const spawn = require('cross-spawn');

spawn.sync(
  'cp',
  ['dist/scripts/*.js', '~/Library/Application\\ Support/QLC+/RGBScripts/'],
  {
    stdio: 'inherit',
    shell: true,
  }
);
