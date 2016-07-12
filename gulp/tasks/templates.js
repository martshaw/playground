import gulp from 'gulp';
import tap from 'gulp-tap';
import handlebars from 'gulp-compile-handlebars';
import markdown from 'gulp-markdown-to-json';
import rename from 'gulp-rename';
import gutil from 'gulp-util';

gulp.task('templates', ['json'], function () {
    const options = {
        batch: ['./app/templates/partials'],
    };
    return gulp.src('./app/json/data.json')
    .pipe(tap(function(file) {
        const data = file.contents.toString();
        return gulp.src('./app/templates/*.hbs')
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build/'));
    }));
});

gulp.task('json', function () {
    gulp.src('./app/assets/content/**.md')
    .pipe(gutil.buffer())
    .pipe(markdown('data.json'))
    .pipe(gulp.dest('./app/json/'));
});
