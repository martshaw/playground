import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import buble from 'gulp-buble';
import rollup from 'gulp-rollup';
import babel from 'rollup-plugin-babel';

gulp.task('buble', function () {
    gulp.src('./app/js/app.js', { read: false })
        .pipe(sourcemaps.init())
        .pipe(buble())
        .pipe(rollup({
            format: 'es6',
            // any option supported by Rollup can be set here, including sourceMap
            sourceMap: true,
            plugins: [
                babel({
                    exclude: 'node_modules/**',
                    presets: ['es2015-rollup'],
                    babelrc: false
                })
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/'));
});
