var gulp = require("gulp");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");
var nodemon = require("gulp-nodemon");
var soucremaps = require("gulp-sourcemaps");

console.log("path",process.argv[0]);

gulp.task("develop",function(){ //shut and restart the server
    nodemon({
        script:'run_server.js',
        ext:'jade js scss',
        tasks:['sass'],
        ignore :['node_modules/','bin/'],
        env : {'NODE_ENV':'development'} 
    }).on('restart',function(){
        console.log("restarted!");
    })
});


//compile the sass file
gulp.task('sass', function() {
    gulp.src('static/sass/main.scss')
        .pipe(soucremaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(soucremaps.write())
        .pipe(gulp.dest('static/css/'));
});

gulp.task('watch',function(){
    gulp.watch('./static/sass/**/*.scss',['sass']);
});

gulp.task('default', ['watch','develop']);

