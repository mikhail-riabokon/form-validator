var uglify = require('gulp-uglify');
var gulp = require('gulp');
var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
    gulp.src('src/index.js'),
    uglify(),
    gulp.dest('lib')
  ],
    cb
  );
});
