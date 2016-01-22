var gulp = require('gulp');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var partialImport = require('postcss-partial-import');

gulp.task('css', function () {
  var processors = [
    nested,
    partialImport,
    autoprefixer({ browsers: ['last 2 versions'] })
  ];
  return gulp.src('styles/main.css')
             .pipe(postcss(processors, {syntax: scss}))
             .pipe(gulp.dest('.tmp'));
});
