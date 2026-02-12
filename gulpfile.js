'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var cwd = './src/';
var html = ['*.html', '!_*.html'];
var imagesSource = "./src/images/**/*.{jpg,jpeg,png,gif,svg}";
var videosSource = "./src/videos/**/*.{mp4,webm,ogg}";
var fontsSource = "./src/fonts/**/*.*";
var jsSource = './src/js/**/*.js';
var appScss = "./src/sass/*.scss";
var sitemapAndRobotsSource = "./*.txt";
var buildHTMLDest= "./build";
var buildJsDest= "./build/js";
var buildCSSDest= "./build/css";
var buildImagesDest= "./build/images";
var buildVideosDest= "./build/videos";
var buildFontsDest= "./build/fonts";
var buildSitemapAndRobots= "./build";

gulp.task('template', function() {
    return gulp.src(html, {
        cwd: cwd
    })
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(nunjucksRender({path: cwd}))
        .pipe(gulp.dest(buildHTMLDest));//direction for html pages
});

gulp.task('copyImages', function() {
    return gulp.src([imagesSource])
        .pipe(plumber())
        .pipe(gulp.dest(buildImagesDest));
});

gulp.task('copyVideos', function() {
    return gulp.src([videosSource])
        .pipe(plumber())
        .pipe(gulp.dest(buildVideosDest));
});

gulp.task('copyFonts', function() {
    return gulp.src([fontsSource])
        .pipe(plumber())
        .pipe(gulp.dest(buildFontsDest));
});

gulp.task('copySitemapAndRobots', function() {
    return gulp.src([sitemapAndRobotsSource])
        .pipe(plumber())
        .pipe(gulp.dest(buildSitemapAndRobots));
});

gulp.task('compressJS', function() {
    return gulp.src(jsSource)
        // .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildJsDest));
});

gulp.task('app-css', function () {
    return gulp.src([appScss])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(buildCSSDest));//direction for css file
});

gulp.task('clean', function(){
    return del('build');
});

gulp.task('build', gulp.series('clean', 'template', 'app-css', 'compressJS', 'copyImages', 'copyVideos', 'copyFonts', 'copySitemapAndRobots' ));

gulp.task('default', gulp.series('build'));

