var gulp = require("gulp");
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require("path");

var gulp_path ="FrontEnd/static"; 


//lint task
// gulp.task('lint',function(){
//     gulp.src(path.join(gulp_path,"/js/*.js"))
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

//compile the sass file
gulp.task('sass', function() {
    gulp.src(path.join( gulp_path,"/sass/main.scss" ))
        .pipe(sass())
        .pipe(gulp.dest(path.join( path.dirname(process.argv[1]),"/css/main.css" )));
});


//combine all .js to all.min.js
gulp.task('script',function(){
    gulp.src( path.join(gulp_path,"/js/*.js") )
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.join(gulp_path,"/js")))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(gulp_path,"/js")));
    
    gulp.src( path.join(gulp_path,"/js/all.js"))
        .pipe(rename("all.min.js"))
        .pipe(gulp.dest(path.join(gulp_path,"/js")));
});


gulp.task('default',function(){
    gulp.run('sass');

    //监视我们JS文件的变化   
    gulp.watch(path.join(gulp_path,"/js/*.js"),function(){
        gulp.run('scripts');
    });

    //monify the scss files   
    gulp.watch(path.join(gulp_path,"/sass/modules/*.scss"),function(){
        gulp.run('sass');
    });
});

