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
var templateCache = require('gulp-angular-templatecache');
var babel         = require('gulp-babel');
var gutil         = require('gulp-util');
var jscs          = require('gulp-jscs');
var es            = require('event-stream');
var sq            = require('streamqueue');
var del           = require('del');
var vinylPaths    = require('vinyl-paths');





gulp.task('styles', ['clean:styles'], function() {

	// this is to gracefully fail stylus
	var s = stylus();
	
	var sFail = function() {
		//gutil.log(arguments);
		
		console.log('Stylus has a problem');
		s.end();
	};

	// add more gulp.src()'s as extra parameters to the es.merge() below to include ordinary css files
	var stream = es.merge(gulp.src('public/assets/css/style.styl').pipe(s).on('error', sFail))
		.pipe(concatCss('style.min.css'))
		.pipe(uglifycss())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(size())
		.pipe(gulp.dest('public/dist'));
	
	return stream;
	
});





gulp.task('angular', function() {
	
	var tplStream = gulp.src('angular/views/*.html')
		.pipe(templateCache('templates.js', {
			module: 'app.templates'
		}));
	
	var jsStream = gulp.src([
		'angular/app.js',
		'angular/app.routes.js',
		'angular/app.auth.js',
		'angular/**/*.js'
	])
		.pipe(babel())
		//.pipe(jscs())
		.pipe(annotate())
		.pipe(uglify());
	
	// http://stackoverflow.com/questions/26088718/gulp-js-event-stream-merge-order
	var stream = sq({objectMode: true}, jsStream, tplStream)
		.pipe(concat('app.min.js'))
		.pipe(size())
		.pipe(gulp.dest('public/dist'));
	
	return stream;
	
});

gulp.task('libs', function() {
	
	// if you add more js bower components, add them to this list
	// and they'll be included in libs.min.js
	var stream = gulp.src([
		'public/components/jquery/dist/jquery.min.js',
		'public/components/angular/angular.min.js',
		'public/components/angular-resource/angular-resource.min.js',
		'public/components/angular-ui-router/release/angular-ui-router.min.js',
		'public/components/angular-sanitize/angular-sanitize.min.js',
		'public/components/lodash/lodash.min.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest('public/dist'));
	
	return stream;
	
});





gulp.task('clean:styles', function(cb){
	
	del(['public/dist/style.min.css'], cb);
	
});





gulp.task('clean:scripts', function(cb){
	
	del([
		'public/dist/app.min.js',
		'public/dist/libs.min.js'
	], cb);
	
});





// watch those tasks, and run them once to begin with
gulp.task('watch', function() {

	gulp.watch(['public/assets/css/*.styl', 'public/assets/css/**/*.styl'], ['styles']);
	
	gulp.watch(['angular/**/*.js', 'angular/*.js', 'angular/views/*.html'], ['angular']);

});




gulp.task('scripts', ['clean:scripts', 'angular', 'libs'], function(){});

gulp.task('default', ['styles', 'angular', 'libs', 'watch'], function(){
	console.log('Ready to go!');
});

gulp.task('clean', ['clean:styles', 'clean:scripts'], function(){});
