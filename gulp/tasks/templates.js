import gulp from 'gulp';
import handlebars from 'gulp-compile-handlebars';
import rename from 'gulp-rename';

gulp.task('templates', function () {
    const options = {
        batch: ['./app/templates/partials'],
    };

    return gulp.src('./app/templates/*.hbs')
    .pipe(handlebars(null, options))
    .pipe(rename('mock.html'))
    .pipe(gulp.dest('./build/'));
});