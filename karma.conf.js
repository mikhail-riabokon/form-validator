module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'src/index.js',
      'tests/*.tests.js'
    ],

    exclude: ['node_modules'],

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: 1
  });
};
