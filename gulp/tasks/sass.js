import autoprefixer from 'autoprefixer';
import { reload } from 'browser-sync';
import csso from 'gulp-csso';
import csswring from 'csswring';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpPostcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';

import buffer from 'vinyl-buffer';
import postcssAssets from 'postcss-assets';
import config from '../config';

const BROWSER_CONFIG = ['> 1%', 'IE 9'];

const processors = [
    autoprefixer({ browsers: BROWSER_CONFIG }),
    csso,
    csswring,
    postcssAssets
];
const isDev = config.nodeEnv;
gulp.task('sass', () =>
    gulp.src(config.sass.src)
    .pipe(buffer())
    .pipe(gulpIf(!isDev, gulpSourcemaps.init({ loadMaps: true })))
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulpPostcss(processors))
    .pipe(gulpIf(!isDev, gulpSourcemaps.write('./maps')))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(reload({ stream: true }))
);
