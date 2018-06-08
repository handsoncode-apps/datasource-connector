/**
 * Config responsible for building End-to-End test files (bundled into `test/dist/`):
 *  - e2e.entry.js
 *  - helpers.entry.js
 */
const path = require('path');
const webpack = require('webpack');
const configFactory = require('./base');
const JasmineHtml = require('./plugin/jasmine-html');

module.exports.create = function create(envArgs) {
  const config = configFactory.create(envArgs);

  config.forEach(function(c) {
    c.devtool = 'cheap-module-source-map';
    c.target = 'web';
    c.output = {
      libraryTarget: 'var',
      filename: '[name].entry.js',
      path: path.resolve(__dirname, '../test/dist'),
    };
    c.resolve.alias.handsontable = path.resolve(__dirname, '../src');

    c.module.rules.unshift({
      test: [
         // Disable loading css files from pikaday module
        /pikaday\/css/,
      ],
      loader: path.resolve(__dirname, 'loader/empty-loader.js'),
    });

    c.externals = [
      {
        window: 'window',
      },
    ];

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
          '../test/helpers/jasmine-bridge-reporter.js',
          '../test/lib/phantom-reporter.js',
          '../test/lib/jquery.min.js',
          '../test/lib/jquery.simulate.js',
          '../test/lib/lodash.underscore.js',
          '../test/lib/backbone.js',
          '../node_modules/handsontable-pro/dist/hot-formula-parser/formula-parser.js',
          '../node_modules/handsontable-pro/dist/numbro/numbro.js',
          '../node_modules/handsontable-pro/dist/numbro/languages.js',
          '../node_modules/handsontable-pro/dist/moment/moment.js',
          '../node_modules/handsontable-pro/dist/pikaday/pikaday.js',
          '../node_modules/handsontable-pro/dist/handsontable.js',
          '../node_modules/handsontable-pro/dist/languages/all.js',
          '../dist/datasource-connector.js'
        ],
      })
    );

    c.node.global = true;
  });

  return [].concat(config);
}
