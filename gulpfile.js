/**
 * Created by Nathan on 15/9/7.
 */

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    obfuscate = require('gulp-obfuscate'),
    browserify = require('gulp-browserify'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    runSequence = require('gulp-run-sequence');
    port = process.env.port || 5000;

var rootPath = {
    base: 'src/main/webapp/static/',
    npm: 'node_modules/',
    jsp: 'src/main/webapp/WEB-INF/views/'
};

//var theme = rootPath.npm+'bootstrap/dist/css/bootstrap.css';

var theme = {
    materialize: {
        css: rootPath.base+'src/vendor/materialize-css/materialize.css',
        js: rootPath.base+'src/vendor/materialize-css/materialize.js'
    },
    bootstrap: {
        css: rootPath.npm + 'admin-lte/bootstrap/css/bootstrap.min.css',
        js: rootPath.npm + 'admin-lte/bootstrap/js/bootstrap.min.js'
    },
    adminLTE: {
        css: rootPath.npm+'admin-lte/dist/css/**/*.css',
        js: rootPath.npm+'admin-lte/dist/js/app.min.js'
    }
};

var path = {
    main: rootPath.base+'src/js/main.js',
    scss: rootPath.base+'_unbuild/scss/style.scss',
    style: rootPath.base+'src/css/style.css',
    common_css: [
        rootPath.base+'src/css/vendor/**/*.css',
        theme.bootstrap.css,
        theme.adminLTE.css,
        rootPath.base+'src/css/style.css'
    ],
    vendor_js: rootPath.base+'src/vendor/**/*.js',
    bundle: {
        css: rootPath.base+'admin/dist/css/',
        js: rootPath.base+'admin/dist/js/'
    },
    reload: {
        css: [rootPath.base+'admin/dist/css/bundle.min.css'],
        assets: [rootPath.base+'admin/assets/**/*'],
        html: [rootPath.base+'src/template/**/*.html'],
        jsp: [rootPath.jsp+'**/*.jsp']
    }
};

//live reload
gulp.task('connect', function(){
    connect.server({
        //root:'./',
        port: port,
        livereload: true
    })
});


//compile js & css
gulp.task('scss', function() {
    return gulp.src(path.scss)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'chrome 39', 'firefox 34', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(rootPath.base+'src/css'))
        .pipe(notify({ message: 'scss task complete' }));
});

gulp.task('browserify', function(){
    gulp.src(path.main)
        .pipe(browserify())
        .pipe(rename('main.js'))
        .pipe(gulp.dest(path.bundle.js))
        .pipe(notify({ message: 'browserify task complete' }));
});
//end compile js & css

gulp.task('materialize', function(){
    return gulp.src(rootPath.base+'_unbuild/scss/materialize/ghpages-materialize.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'chrome 39', 'firefox 34', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(rootPath.base+'src/css/vendor'))
        .pipe(notify({ message: 'materialize task complete' }));
});

//concat & minify js & css
gulp.task('cssmin', function() {
    return gulp.src(path.common_css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(path.bundle.css))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.bundle.css))
        .pipe(connect.reload())
        .pipe(notify({ message: 'cssmin task complete' }));
});

gulp.task('jsmin', function() {
    return gulp.src([
        rootPath.npm+'jquery/dist/jquery.min.js',
        rootPath.base+"src/js/utils/**/*",
        path.vendor_js,
        theme.bootstrap.js,
        theme.adminLTE.js,
        path.bundle.js+'main.js'
    ]).pipe(concat('bundle.js'))
        .pipe(gulp.dest(path.bundle.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.bundle.js))
        .pipe(connect.reload())
        .pipe(notify({ message: 'bundle scripts task complete' }));
});
//end concat & minify js & css

gulp.task('obfuscate', function () {
    return gulp.src(path.bundle.js+'bundle.min.js')
        .pipe(obfuscate({ replaceMethod: obfuscate.ZALGO }))
        .pipe(rename({suffix: '.mix'}))
        .pipe(gulp.dest(path.bundle.js))
        .pipe(notify({ message: 'obfuscate task complete' }));
});

gulp.task('watch', function(){
    gulp.watch(rootPath.base+'_unbuild/scss/**/*.scss', ['scss']);
    gulp.watch(path.style, ['cssmin']);
    gulp.watch(rootPath.base+'/src/js/**/*.js', ['browserify']);
    gulp.watch(path.bundle.js+'main.js', ['jsmin']);
    gulp.watch(rootPath.jsp+'**/*', function(event){
        gulp.src(event.path).pipe(connect.reload());

    });
});

gulp.task('help', function(){
    console.log('	gulp build			文件打包');
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', function(){
    runSequence(['scss', 'browserify'], ['cssmin', 'jsmin']);
});