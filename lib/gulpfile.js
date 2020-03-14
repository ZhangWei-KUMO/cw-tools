'use strict';

const gulp = require('gulp');
const path = require('path');
const resolveCwd = require('./resolveCwd');
const pkg = require(resolveCwd('package.json'));
const fs = require("fs");
const cwd = process.cwd();

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

gulp.task('filesize', () => {
  console.log(pkg)
});

gulp.task('dist', () => {
  let entry = pkg.config && pkg.config.entry;
  if (!entry) {
    return;
  };

  let distDir = path.join.apply(path, [cwd + 'dist/']);
  console.log(distDir)
  if (fs.existsSync(resolveCwd("webpack.config.js"))) {
    console.log("存在")
  } else {
    console.log("不存在")
  }
});


gulp.on("TASK_NOT_FOUND", (metadata) => {
  console.log(`${metadata.taskName} 任务名称不存在`)
});

gulp.on("TASK_STOP", (metadata) => {
  let duration = (metadata.runDuration[1] - metadata.runDuration[0]) / 1000000;
  console.log(`${metadata.taskName} 任务运行结束，运行时长：${duration.toFixed(2)}秒`)
})

gulp.on("TASK_RUN_ERR", (metadata) => {
  let duration = (metadata.runDuration[1] - metadata.runDuration[0]) / 1000000;
  console.log(`${metadata.taskName} 任务运行出错，运行时长：${duration.toFixed(2)}秒`)
  console.error(metadata)
})

gulp.on("TASK_START", (metadata) => {
  console.log(`${metadata.taskName} 任务运行开始`)
})