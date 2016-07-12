import gulp from 'gulp';
import config from '../config';
import eslint from 'gulp-eslint';
import handleErrors from '../utils/handleErrors';

gulp.task('lint', () =>
    gulp.src(config.js.src)
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.formatEach())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError())
        .on('error', handleErrors)
);