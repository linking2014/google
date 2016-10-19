var gulp = require('gulp');
var gulpCssnano = require('gulp-cssnano');
var gulpPlumber = require('gulp-plumber');
var gulpConnect = require('gulp-connect');
var gulpSass = require('gulp-sass');
var postcss = require('gulp-postcss');
//var px2rem = require('postcss-px2rem');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    //var processors = [px2rem({remUnit: 75})];
    return gulp.src('./sass/*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        //.pipe(postcss(processors))
        .pipe(autoprefixer({
            browsers: ["ie 8", "Chrome > 20", "Firefox > 5"],
            cascade: false
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(['./*.css'])
        .pipe(gulpPlumber())
        .pipe(gulpCssnano())
        .pipe(gulp.dest('./build/'));
});

gulp.task('font', function () {
     return gulp.src('./font/*.+(eot|svg|ttf|woff)')
         .pipe(gulp.dest('./build/font/'));
});

gulp.task('html', function () {
     return gulp.src('*.html')
         .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['css', 'font', 'html'], function () {
    //return gulp.src('./**');
        // .pipe(gulp.dest(config.release));
});

gulp.task('watch', function () {
    // livereload.listen();
    gulp.watch('./sass/*.scss', ['css']);
    //gulp.watch('*.css', ['css']);
    gulp.watch('*.html', ['html']);
});

//启动一个本地调试服务器
gulp.task('server', function () {
    gulpConnect.server({
        root: '',
        port: 8000
    });
});