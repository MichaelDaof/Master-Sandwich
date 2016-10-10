import fs from 'fs';
import path from 'path';
import register from 'babel-core/register';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import mockery from "mockery";
import 'airbnb-js-shims'

// Ignore all node_modules except these
const modulesToCompile = [
  'react-native',
  'tcomb',
  // 'react-native-maps',
  // 'react-native-image-picker'
].map((moduleName) => new RegExp(`/node_modules/${moduleName}`));
const rcPath = path.join(__dirname, '..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);
config.ignore = function(filename) {
  if (!(/\/node_modules\//).test(filename)) {
    return false;
  } else {
    const matches = modulesToCompile.filter((regex) => regex.test(filename));
    const shouldIgnore = matches.length === 0;
    return shouldIgnore;
  }
}
register(config);
// Setup globals / chai
global.__DEV__ = true;
global.expect = chai.expect;
chai.use(chaiEnzyme());
// Setup mocks
require('react-native-mock/mock');
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});
// for react-native-maps
mockery.registerMock('react-native/Libraries/Image/resolveAssetSource')
// for tcomb-form-native
mockery.registerMock('./select')
mockery.registerMock('./datepicker')
// aws credentials
mockery.registerMock('./credentials')
mockery.registerMock('../../resources/red-arrow.png')
const React = require('react-native')
React.NavigationExperimental = {
  AnimatedView: React.View
};
