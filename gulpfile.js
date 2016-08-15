var gulp = require('gulp');
var gulpCssnano = require('gulp-cssnano');
var gulpPlumber = require('gulp-plumber');
var gulpReplace = require('gulp-replace');
var gulpUglify = require('gulp-uglify');
// var gulpImage = require('gulp-image');
var gulpConnect = require('gulp-connect');
var gulpSass = require('gulp-sass');
// var webpackStream = require('webpack-stream');
// var livereload = require('gulp-livereload');
// var jade = require("gulp-jade");
// var inlinesource = require('gulp-inline-source');
var postcss = require('gulp-postcss');
//var px2rem = require('postcss-px2rem');
var autoprefixer = require('gulp-autoprefixer');

//全局配置相关
var config = {
    //宏定义
    macro: {
        '__VERSION': Date.now().toString(16)
    },
    //发布目录
    release: '../dist',
    //webpack构建配置
    webpack: {
        index: './js/index.js'
    }
};

gulp.task('sass', function () {
    //var processors = [px2rem({remUnit: 75})];
    return gulp.src('./*.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        //.pipe(postcss(processors))
        .pipe(autoprefixer({
            browsers: ["ie 8", "Chrome > 20", "Firefox > 5"],
            cascade: false
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(['./*.css', '!./css/animate.css'])
        .pipe(gulpPlumber())
        .pipe(gulpCssnano())
        .pipe(gulp.dest('./build/'));
});

gulp.task('webpack', function () {
    // return gulp.src('./js/*.js')
    //     .pipe(webpackStream({
    //         entry: config.webpack,
    //         output: {
    //             filename: '[name].bundle.js'
    //         }
    //     }))
    //     .pipe(gulp.dest('./js/'));
});

gulp.task('js', ['webpack'], function () {
    // return gulp.src(['./js/*.bundle.js', './js/flexible.js'])
    //     .pipe(gulpPlumber())
    //     .pipe(gulpUglify())
    //     .pipe(gulp.dest('./build/js/'));
});

gulp.task('image', function () {
    // return gulp.src('./img/*.+(jpg|png|gif|svg)')
    //     .pipe(gulpImage())
    //     .pipe(gulp.dest('./build/img/'));
});

gulp.task('font', function () {
    // return gulp.src('./font/*.+(eot|svg|ttf|woff)')
    //     .pipe(gulp.dest('./build/font/'));
});

gulp.task('jade', function () {
    // return gulp.src(['jade/*.jade', '!jade/layout.jade'])
    //     .pipe(jade({pretty: true}))
    //     .pipe(inlinesource())
    //     .pipe(gulp.dest('./'))
});

gulp.task('html', ['jade'], function () {
    // return gulp.src('./*.html')
    //     .pipe(gulp.dest('./build/'));
});

gulp.task('macro', ['css', 'js', 'image', 'font', 'html'], function () {
    var stream = gulp.src(['./build/**/*.css', './build/**/*.js', 'build/*.html']);
    for (var key in config.macro) {
        if (config.macro.hasOwnProperty(key)) {
            stream = stream.pipe(gulpReplace(key, config.macro[key]));
        }
    }
    return stream.pipe(gulp.dest('./build/'));
});

gulp.task('default', ['macro'], function () {
    return gulp.src('./**');
        // .pipe(gulp.dest(config.release));
});

gulp.task('watch', function () {
    // livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['css']);
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('jade/**/*.jade', ['html']);
});

//启动一个本地调试服务器
gulp.task('server', function () {
    gulpConnect.server({
        root: '',
        port: 8000
    });
});