var gulp = require('gulp');
var to5 = require('gulp-6to5');

gulp.task('es6', function() {
	return gulp.src('src/**/*.js')
		.pipe(to5())
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['es6']);
});

gulp.task('default', ['es6', 'watch']);