var gulp          = require('gulp');
var watch         = require('gulp-watch');
var concat        = require('gulp-concat');
var concatCss     = require('gulp-concat-css');
var uglify        = require('gulp-uglify');
var uglifycss     = require('gulp-uglifycss');
var autoprefixer  = require('gulp-autoprefixer');
var stylus        = require('gulp-stylus');
var size          = require('gulp-filesize');
var annotate      = require('gulp-ng-annotate');
var gutil         = require('gulp-util');
var jscs          = require('gulp-jscs');
var es            = require('event-stream');
var del           = require('del');
var vinylPaths    = require('vinyl-paths');





gulp.task('styles', ['clean:styles'], function() {

	// this is to gracefully fail stylus
	var s = stylus();
	
	var sFail = function() {
		//gutil.log(arguments);
		
		console.log('yo!');
		s.end();
	};

	// add more gulp.src()'s as extra parameters to the es.merge() below to include ordinary css files
	var stream = es.merge(gulp.src('client/assets/css/style.styl').pipe(s).on('error', sFail))

	.pipe(concatCss('style.min.css'))

	.pipe(uglifycss())
	
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	
	.pipe(size())

	.pipe(gulp.dest('client/assets/dist'));
	
	return stream;
	
});





gulp.task('angular', function() {
	
	var stream = gulp.src([
		'client/app/app.js',
		'client/app/app.routes.js',
		'client/app/app.auth.js',
		'client/app/**/*.js'
	])
	
	.pipe(jscs())
	
	.pipe(concat('app.min.js'))
	
	.pipe(annotate())
	
	.pipe(uglify())
	
	.pipe(size())
	
	.pipe(gulp.dest('client/assets/dist'));
	
	return stream;
	
});

gulp.task('libs', function() {
	
	// if you add more js bower components, add them to this list
	// and they'll be included in libs.min.js
	var stream = gulp.src([
		'client/components/jquery/dist/jquery.min.js',
		'client/components/angular/angular.min.js',
		'client/components/angular-resource/angular-resource.min.js',
		'client/components/angular-ui-router/release/angular-ui-router.min.js',
		'client/components/angular-sanitize/angular-sanitize.min.js',
		'client/components/lodash/lodash.min.js'
	])
	
	.pipe(concat('libs.min.js'))
	
	.pipe(uglify())
	
	.pipe(size())
	
	.pipe(gulp.dest('client/assets/dist'));
	
	return stream;
	
});





gulp.task('clean:styles', function(cb){
	
	del(['client/assets/dist/style.min.css'], cb);
	
});





gulp.task('clean:scripts', function(cb){
	
	del([
		'client/assets/dist/app.min.js',
		'client/assets/dist/libs.min.js'
	], cb);
	
});





// watch those tasks, and run them once to begin with
gulp.task('watch', function() {

	gulp.watch(['client/assets/css/*.styl', 'client/assets/css/**/*.styl'], ['styles']);
	
	gulp.watch(['client/app/**/*.js', 'client/app/*.js'], ['angular']);

});




gulp.task('scripts', ['clean:scripts', 'angular', 'libs'], function(){});

gulp.task('default', ['styles', 'angular', 'libs', 'watch'], function(){});

gulp.task('clean', ['clean:styles', 'clean:scripts'], function(){});
