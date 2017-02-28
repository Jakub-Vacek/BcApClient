//@author jakubvacek
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('styles', function () {
    gulp.src('sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./css/'));
});
gulp.task('default', function () {
    //gulp.watch('sass/**/*.scss',['styles']);
});


