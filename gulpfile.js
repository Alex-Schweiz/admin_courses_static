var gulp = require('gulp');
var pug = require('gulp-pug');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var minify = require('gulp-minify');
var watch = require('gulp-watch');

gulp.task('html', function buildHTML() {
    return gulp.src('app/admin/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public/admin'));
});

//CSS Tasks
gulp.task('styles', function buildStyles(){
    return gulp.src('app/admin/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/admin/css'))
});

gulp.task('moveBootstrapCSS', function buildStyles(){
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/admin/bootstrap/css'))
});

gulp.task('moveSkinsCSS', function buildStyles(){
    return gulp.src('app/admin/css/skins/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/admin/css/skins'))
});

//JS Tasks
gulp.task('moveJQuery', function() {
    gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(minify())
        .pipe(gulp.dest('public/admin/js/jquery'));
});

gulp.task('moveBootstrapJS', function() {
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
        .pipe(minify())
        .pipe(gulp.dest('public/admin/bootstrap/js'));
});
gulp.task('moveAppJS', function() {
    gulp.src('app/admin/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('public/admin/js'));
});

//Image Tasks
gulp.task('images', function() {
    return gulp.src('app/admin/img/**/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('public/admin/img'));
});

gulp.task('watch', function() {
    gulp.watch('app/pug/*', ['html']);
});

gulp.task('default', ['html','styles',
    'moveBootstrapCSS','moveSkinsCSS',
    'moveJQuery','moveBootstrapJS','moveAppJS']);
