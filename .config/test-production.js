'use strict';

/**
 * Config responsible for building End-to-End test files (bundled into `test/dist/`). These tests testing `*.full.min.js` files:
 *  - e2e.entry.js
 *  - helpers.entry.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const configFactory = require('./test-e2e');
const JasmineHtml = require('./plugin/jasmine-html');

module.exports.create = function create(envArgs) {
  const config = configFactory.create(envArgs);

  config.forEach(function(c) {
    // Remove all 'JasmineHtml' instances
    c.plugins = c.plugins.filter(function(plugin) {
      return !(plugin instanceof HtmlWebpackPlugin);
    });

    c.plugins.push(
      new JasmineHtml({
        filename: path.resolve(__dirname, '../test/E2ERunner.html'),
        baseJasminePath: '../',
        externalCssFiles: [
          '../test/lib/normalize.css',
          '../node_modules/handsontable-pro/dist/handsontable.css',
          '../test/helpers/common.css',
        ],
        externalJsFiles: [
          '../test/lib/phantom-reporter.js',
          '../test/lib/jquery.min.js',
          '../test/lib/jquery.simulate.js',
          '../test/lib/lodash.underscore.js',
          '../test/lib/backbone.js',
          '../node_modules/handsontable-pro/dist/handsontable.full.min.js',
          '../dist/numbro/languages.js',
          '../dist/languages/all.min.js',
        ],
      })
    );
  });

  return [].concat(config);
}
