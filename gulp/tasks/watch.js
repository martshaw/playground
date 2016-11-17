import gulp from 'gulp';
import config from '../config';

gulp.task('watch', ['sass'], function() {
    gulp.watch(config.js.src, ['lint']);
    gulp.watch(config.sass.src, ['sass']);
    gulp.watch(config.assets.images.src, ['images']);
});
