import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import buble from 'rollup-plugin-buble';
import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import config from '../config';

function compile() {
    return rollup({
        entry: 'app/js/app.js',
        sourceMap: true,
        plugins: [
            nodeResolve({ jsnext: true, main: true, skip: './package.json' }),
            commonjs(),
            babel({
                exclude: 'node_modules/**',
                presets: ['es2015-rollup'],
                babelrc: false
            }),
            buble()
        ]
    });
}
gulp.task('buble', function () {
    return rollup({
        entry: 'app/js/app.js',
        format: 'iife',
        // any option supported by Rollup can be set here, including sourceMap
        sourceMap: true,
        plugins: [
            nodeResolve({ jsnext: true, main: true, browser: true }),
            commonjs({ include: 'node_modules/**' }),
            babel({
                exclude: 'node_modules/**',
                presets: ['es2015-rollup'],
                babelrc: false
            }),
            buble()
        ]
    }).then(function (bundle) {
        bundle.write({
            dest: 'build/js/bundle.js',
            format: 'umd'
        });
    });
});
