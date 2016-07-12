import gulp from 'gulp';
import config from '../config';
import browsersync from 'browser-sync';

gulp.task('browsersync', ['watch'], () =>
    browsersync(config.browserSync)
);
