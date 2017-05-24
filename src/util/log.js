var chalk = require('chalk');
var leftPad = require('left-pad');

exports.info = function(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

exports.error = function (message) {
  console.error(chalk.red(message));
}

exports.success = function (message) {
  console.error(chalk.green(message));
}