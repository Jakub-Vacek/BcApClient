//@author jakubvacek
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');


gulp.task('styles', function () {
    gulp.src('sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./css/'));
});

gulp.task('serve', function () {
    connect.server({
        port: 8383,
        host: 'localhost'
    });
});

gulp.task('default', ['styles']);


