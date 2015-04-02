#!/usr/bin/env node

var fs     = require('fs');
var path   = require('path');
var mkdirp = require('mkdirp');

var localConfigFile   = path.normalize(__dirname + '/../config/sequelize.js');
var projectConfigFile = path.normalize(process.cwd() + '/../../config/sequelize.js');

var localRcFile   = path.normalize(__dirname + '/../config/.sequelizerc');
var projectRcFile = path.normalize(process.cwd() + '/../../.sequelizerc');

try {
  fs.lstatSync(projectConfigFile);
} catch (ex) {
  //unable to stat file because it doesn't exist
  console.log("copying " + localConfigFile + " to " + projectConfigFile);
  fs.createReadStream(localConfigFile).pipe(fs.createWriteStream(projectConfigFile));
}

try {
  fs.lstatSync(projectRcFile);
} catch (ex) {
  console.log("copying " + localRcFile + " to " + projectRcFile + " for ");
  fs.createReadStream(localRcFile).pipe(fs.createWriteStream(projectRcFile));
}

['models', 'test/fixtures'].forEach(function(f){
  mkdirp.sync(path.normalize(process.cwd() + '/../../' + f));
});
