var gulp = require('gulp');
var to5 = require('gulp-6to5');
var jasmine = require('gulp-jasmine');

gulp.task('es6', function() {
	return gulp.src('src/**/*.js')
		.pipe(to5())
		.pipe(gulp.dest('build'));
});

gulp.task('test', function () {
	return gulp.src('spec/*.js')
		.pipe(jasmine());
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['es6']);
	gulp.watch('spec/**/*.js', ['test']);
});

gulp.task('default', ['es6', 'watch']);