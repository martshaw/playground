import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import buble from 'rollup-plugin-buble';
import rollup from 'gulp-rollup';
import babel from 'rollup-plugin-babel';
import config from '../config';

gulp.task('buble', () =>
    gulp.src(config.js.src)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            entry: config.js.buble,
            format: 'es',
            // any option supported by Rollup can be set here, including sourceMap
            sourceMap: true,
            plugins: [
                babel({
                    exclude: 'node_modules/**',
                    presets: ['es2015-rollup'],
                    babelrc: false
                }),
                buble()
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js.dest))
);
