var gulp = require('gulp'),
	changed = require('gulp-changed'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat'),
	gutil = require('gulp-util'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify');


var paths = {
  sass: '_sass',
  css: 'css',
  js: 'js/build'
};

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

// Compass compile and livereload
gulp.task('compass', function(){
	gutil.log(gutil.colors.yellow('live reloaded'));
	return gulp.src(paths.sass + '/*.{sass,scss}')
		// .pipe(changed('css', {extension: '.css'}))
		.pipe(compass({
			config_file: 'config.rb',
			css: paths.css,
			sass: paths.sass, //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest(paths.css))
		.pipe(livereload());

});

gulp.task('jade', function(){
	gulp.src('./*.jade')
		.pipe(changed('.', {extension: '.html'}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('.'))
		.pipe(livereload());
	gutil.log(gutil.colors.green('jade reloaded'));
})

gulp.task('compress', function() {
  gulp.src([ 'js/libs/*.js', 'js/all.js' ])
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.js))
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch( paths.sass + '/**/*.{sass,scss}', ['compass']);
	gulp.watch('./*.jade', ['jade']);
	// gulp.watch(['./js/*']).on('change', livereload.changed );
	gulp.watch(['./js/*.js'], ['compress']);
})

gulp.task('default', ['compass', 'watch']);

