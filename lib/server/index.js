const Koa = require('koa');
const serve = require("koa-static");
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const resolveCwd = require("../resolveCwd");
var app = new Koa();
const root = resolveCwd("examples");
console.log(root)
const opts = {
  maxage: 10 * 1000,
  hidden: true,
  index: 'index.html'
};

module.exports = function () {
  app.use(serve(root, opts));
  return app;
}

