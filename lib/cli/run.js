#!/usr/bin/env node

require('colorful').colorful();
const gulp = require('gulp');
const program = require('commander');

function runTask(taskName) {
  var metadata = { taskName };
  const taskInstance = gulp.task(taskName);
  if (taskInstance === undefined) {
    gulp.emit('TASK_NOT_FOUND', metadata);
    return;
  }
  const start = process.hrtime();
  gulp.emit("TASK_START", metadata);
  try {
    taskInstance.apply(gulp);
    metadata.runDuration = process.hrtime(start);
    gulp.emit("TASK_STOP", metadata);
  } catch (err) {
    err.runDuration = process.hrtime(start)
    err.taskName = metadata.taskName;
    gulp.emit("TASK_RUN_ERR", err);
  }
}

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'cw-tool run filesize', '获取文件大小');
  console.log();
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else if (task === "start") {
  var port = process.env.npm_package_config_port || 8000;
  console.log(`Listening at http://localhost:${port}`);
  var app = require('../server/')();
  app.listen(port);
} else {
  console.log('cw-tool run', task);
  require('../gulpfile');
  runTask(task)
}
