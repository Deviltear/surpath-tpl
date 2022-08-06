#! /usr/bin/env node

const { argv } = require('yargs')
  .usage('创建统一模块模板')
  .option('d', {
    alias: 'root',
    default: "src/pages",
    describe: "需要创建模板的目录",
  })
  .option('a', {
    alias: 'author',
    default: "",
    describe: "作者",
  })
  .help();

const Main = require("./main");

Main(argv);
