'use strict';
var path = require('path');

module.exports = function resolveCwd() {
  const pathArgs = Array.prototype.slice.call(arguments, 0);
  pathArgs.unshift(process.cwd());
  return path.join.apply(path, pathArgs);
};
