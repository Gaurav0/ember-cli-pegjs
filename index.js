'use strict';

var peg = require('@peeriq/broccoli-pegjs');

module.exports = {
  name: '@peeriq/ember-cli-pegjs',

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (!app.options.pegOptions)
      app.options.pegOptions = {};

    if (!app.options.pegOptions.wrapper) {
      app.options.pegOptions.wrapper = function (src, parser) {
        return 'export default ' + parser;
      }
    }

    this.pegOptions = app.options.pegOptions;

    this.setupPreprocessorRegistry('parent', app.registry);
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('js', {
      name: '@peeriq/ember-cli-pegjs',
      ext: 'pegjs',
      toTree: tree => {
        if (!this.pegOptions) {
          return tree;
        }
        return new peg(tree, this.pegOptions);
      }
    });
  }
};
