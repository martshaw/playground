
import gulp from 'gulp';

gulp.task('server', ['clean', 'images', 'compile', 'templates', 'browsersync']);
gulp.task('build', ['clean', 'buble', 'compile', 'sass', 'images', 'tempaltes']);
gulp.task('default', ['server']);
