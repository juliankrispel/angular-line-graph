var package = require('./package.json');
var gulp = require('gulp');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var uglify = require('gulp-uglify');

gulp.task('default', function(){
    gulp.watch('src/**/*.js', ['build']);
    connect.server({port: 8081});
});

gulp.task('build', function() {
    var mainStream = gulp.src('src/*.js')
        .pipe(concat(package.name +'.js'))
        .pipe(wrap('(function(){\n<%=contents%>})();'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist'));
});
