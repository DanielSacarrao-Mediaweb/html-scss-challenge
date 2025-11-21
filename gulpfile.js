// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");

//          ** File Path Variables **            //
const styleSRC = '2-src/scss/*.scss';
const styleDIST = './1-dist/css/';

// ============================================= //
//              ** Styles tasks **               //
// ============================================= //

function compileStyles(){
            // 1. Define the input file (scss)
    return gulp.src( styleSRC )
            // 2. Pass it through sass compiler with map
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            // 3. Add auto prefixes
            .pipe(autoprefixer({
                browserslistrc: ['last 3 versions', '> 2%'],
                cascade: false
            }))
            // 4. Save the compiled CSS
            // .pipe(sourcemaps.write('./maps'))
            .pipe(
                gulp.dest( styleDIST )
            );
}

// ============================================= //
//       ** Gulp generic task functions **       //
// ============================================= //

// Clean vendor
function clean() {
    return del([styleDIST]);
}

// Watching the changes on files
function watchFiles() {
    gulp.watch('./2-src/scss/**/*.scss', compileStyles);
}

const watch = gulp.series(clean, gulp.parallel(watchFiles, compileStyles));

// ============================================= //
//          ** Gulp Exporting tasks **           //
// ============================================= //
module.exports = {
    style: compileStyles,
    clean: clean,
    build: clean,
    watch: watch,
    default: watch
}
