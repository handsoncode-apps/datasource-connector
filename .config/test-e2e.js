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
          '../test/spec/helpers/common.css',
        ],
        externalJsFiles: [
          '../test/lib/phantom-reporter.js',
          '..node_modules/handsontable-pro/dist/handsontable.full.js',
          '../dist/datasource-connector.full.js'
        ],
      })
    );

    c.node.global = true;
  });

  return [].concat(config);
}
