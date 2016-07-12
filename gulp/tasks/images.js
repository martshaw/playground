import gulp from 'gulp';
import image from 'gulp-imagemin';
import config from '../config';

gulp.task('images', () =>
    gulp.src(config.assets.images.src)
   .pipe(image())
   .pipe(gulp.dest(config.assets.images.dest))
);
