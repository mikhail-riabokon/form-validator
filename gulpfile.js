var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var serve = require('gulp-serve');
var clean = require('gulp-clean');
var gulp = require('gulp');
var pump = require('pump');

gulp.task('clean', function () {
  return gulp.src('public/form-validator.js', {read: false}).pipe(clean());
});

gulp.task('compress', ['clean'], function (cb) {
  var options = [
    gulp.src('src/index.js')
  ];

  if (!process.env.IS_DEV) {
    options.push(uglify());
  }

  options = options.concat([
    rename('form-validator.js'),
    gulp.dest('public')
  ]);

  pump(options, cb);
});

gulp.task('webserver', ['compress'], serve(['public']));
gulp.task('webserver:prod', serve(['public']));
