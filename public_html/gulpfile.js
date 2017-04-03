//@author jakubvacek
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

gulp.task('styles', function () {
    gulp.src('sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./css/'));
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: 8383,
      directoryListing: true,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', ['styles']);


