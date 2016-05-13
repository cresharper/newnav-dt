var gulp = require('gulp');
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');
    cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();



gulp.task('default', ['scripts', 'styles', 'serve']);

//scripts task
//Uglifies JS

gulp.task('scripts', function() {
	gulp.src('dev/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.stream());
});

gulp.task('styles', function() {
	return sass('dev/scss/styles.scss')
	.pipe(cleanCSS())
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream());
});

//server + file watching 
gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("dev/scss/*.scss", ['styles']);
    gulp.watch('dev/js/*.js', ['scripts']);
    gulp.watch("./*.html").on('change', browserSync.reload);

});