#!/usr/bin/env node
'use strict';

var program = require('commander');
var packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .command('test [name]', 'test specified task')
  .parse(process.argv);

var proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

process.on('SIGINT', () => {
  if (proc) {
    proc.kill('SIGKILL');
  }
  process.exit(0);
});

var subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
