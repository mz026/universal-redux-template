var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({ camelize: true })

gulp.task('css', function() {
  return gulp.src('app/styles/main.scss')
           .pipe($.sourcemaps.init())
           .pipe($.sass().on('error', $.sass.logError))
           .pipe($.autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
           }))
           .pipe($.sourcemaps.write())
           .pipe(gulp.dest('./dist'))
})

gulp.task('css:watch', function() {
  gulp.watch('app/styles/**/*.scss', ['css'])
})

gulp.task('moveAssets', function() {
  return gulp.src('./app/assets/**/*')
             .pipe(gulp.dest('./dist/assets'))
})

gulp.task('build', ['css', 'moveAssets'], function() {
  var rev = new $.revAll()
  return gulp.src('./dist/**/*')
             .pipe(rev.revision())
             .pipe(gulp.dest('./dist'))
             .pipe(rev.manifestFile())
             .pipe(gulp.dest('./dist'))
})
