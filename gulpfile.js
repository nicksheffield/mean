var del           = require('del')                          // delete files
var gulp          = require('gulp')                         // the main guy
var jscs          = require('gulp-jscs')                    // javascript code style
var babel         = require('gulp-babel')                   // process es2015 syntax
var order         = require('gulp-order')                   // reorder files in stream
var insert        = require('gulp-insert')                  // add text to file
var rename        = require('gulp-rename')                  // rename file
var concat        = require('gulp-concat')                  // merge files together
var uglify        = require('gulp-uglify')                  // minify js
var stylus        = require('gulp-stylus')                  // turn stylus into css
var addsrc        = require('gulp-add-src')                 // mid-stream gulp.src()
var plumber       = require('gulp-plumber')                 // handle errors without crashing
var filelog       = require('gulp-filelog')                 // list all files in the stream
var stylish       = require('gulp-jscs-stylish')            // make jscs output nicer
var annotate      = require('gulp-ng-annotate')             // safely minify angular
var minifycss     = require('gulp-minify-css')              // minify css code
var sourcemap     = require('gulp-sourcemaps')              // create sourcemaps
var autoprefix    = require('gulp-autoprefixer')            // prefix any css with low support
var templateCache = require('gulp-angular-templatecache')   // cache angular template files



gulp.task('css', function() {

	var stream = gulp.src('./public/assets/css/style.styl') // get the source files
		.pipe(plumber())                                    // stop syntax errors crashing the watch
		.pipe(sourcemap.init())                             // get ready to write a sourcemap
		.pipe(stylus())                                     // turn the stylus into css
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(autoprefix('last 2 versions'))                // autoprefix the css code
		.pipe(gulp.dest('public/dist/'))                    // save it into the dist folder
		.pipe(minifycss())                                  // minify it (removes the sourcemap)
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(rename('style.min.css'))                      // add .min to the filename
		.pipe(gulp.dest('public/dist/'))                    // save it into the dist folder
	
	return stream

})



gulp.task('angular', function() {
	
	var tplCacheOpts = {
		module: 'app.templates'
	}

	var stream = gulp.src('angular/views/*.html')           // grab all the html views
		.pipe(plumber())                                    // stop any errors from breaking a watch
		.pipe(templateCache('templates.js', tplCacheOpts))  // make a template cache from them
		.pipe(insert.prepend('//jscs:disable\n'))           // disable jscs for the template cache
		.pipe(addsrc(['angular/*.js', 'angular/**/*.js']))  // add the rest of the angular app
		.pipe(order(['app.js']))                            // make sure app.js is first
		//.pipe(filelog())                                  // log the files in the stream
		.pipe(babel())                                      // enable ES2015 support
		.pipe(jscs())                                       // javascript code style
		.on('error', function(){})                          // suppress jscs error reporting
		.pipe(stylish())                                    // third-party jscs error reporting
		.pipe(annotate())                                   // make angular callbacks minifyable
		.pipe(uglify())                                     // minify the code
		.pipe(concat('app.min.js'))                         // merge them all into the same file
		.pipe(gulp.dest('public/dist/'))                    // save it into the dist folder
		
	return stream
	
})



gulp.task('libs', function() {
	
	// if you add more js bower components, add them to this list
	// and they'll be included in libs.min.js
	var libs = [
		'public/components/jquery/dist/jquery.min.js',
		'public/components/angular/angular.min.js',
		'public/components/angular-resource/angular-resource.min.js',
		'public/components/angular-ui-router/release/angular-ui-router.min.js',
		'public/components/angular-sanitize/angular-sanitize.min.js',
		'public/components/lodash/lodash.min.js'
	]

	var stream = gulp.src(libs)                             // get all the lib files
		.pipe(concat('libs.min.js'))                        // merge them together
		.pipe(uglify())                                     // minify the js
		.pipe(gulp.dest('public/dist/'))                    // save it into the dist folder
	
	return stream
	
})



gulp.task('reset', function(){
	
	del([
		'angular/*/*.js',
		'server/controllers/*.js',
		'server/events/*.js',
		'server/models/*.js',
		'server/views/*.html',
		'public/dist/*.css',
		'public/dist/*.js'
	], {
		ignore: [
			'angular/controllers/mainCtrl.js',
			'angular/services/$config.js',
			'angular/services/$socket.js',
			'angular/views/main.html'
		]
	})
	
})



gulp.task('watch', ['angular', 'css'], function() {
	
	gulp.watch(['public/assets/css/*.styl', 'public/assets/css/**/*.styl'], ['css'])
	gulp.watch(['angular/**/*.js', 'angular/*.js', 'angular/views/*.html'], ['angular'])
	
})



gulp.task('default', ['css', 'angular', 'libs'], function(){
	
	console.log('Ready to go!')
	
})