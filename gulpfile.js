/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("default", function () {
     gulp.src(['./script/script.js'])
      .pipe(concat('site.js'))
      .pipe(uglify({ mangle: false }))
      .pipe(gulp.dest('./wwwroot/js/'))
});



//var gulp = require("gulp"),
//  gutil = require("gulp-util"),
//  jshint = require("gulp-jshint"),
//  browserify = require("gulp-browserify"),
//  concat = require("gulp-concat"),
//  clean = require("gulp-clean");

//// JSHint task
//gulp.task("lint", function () {
//    gulp
//      .src("./scripts/*.js")
//      .pipe(jshint())
//      // You can look into pretty reporters as well, but that's another story
//      .pipe(jshint.reporter("default"));
//});

//// Browserify task
//gulp.task("browserify", function () {
//    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
//    gulp
//      .src(["scripts/script.js"])
//      .pipe(
//        browserify({
//            insertGlobals: true,
//            debug: true
//        })
//      )
//      // Bundle to a single file
//      .pipe(concat("site.js"))
//      // Output it to our dist folder
//      .pipe(gulp.dest("wwwroot/js"));
//});

//gulp.task("watch", ["lint"], function () {
//    // Watch our scripts
//    gulp.watch(
//      ["scripts/*.js"],
//      ["lint", "browserify"]
//    );
//});