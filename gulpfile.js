var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

gulp.task('css', function() {
  return gulp.src('styles/main.scss')
           .pipe($.sass().on('error', $.sass.logError))
           .pipe(gulp.dest('./.tmp'));
})
