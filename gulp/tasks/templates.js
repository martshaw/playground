import gulp from 'gulp';
import tap from 'gulp-tap';
import handlebars from 'gulp-compile-handlebars';
import markdown from 'gulp-markdown-to-json';
import mk from 'gulp-markdown';
import rename from 'gulp-rename';
import gutil from 'gulp-util';

gulp.task('templates', ['json'], function () {
    const options = {
        batch: ['./app/templates/partials'],
    };
    return gulp.src('./build/json/**/*.json')
    .pipe(tap(function(file) {
        const data = JSON.parse(file.contents.toString());
        return gulp.src('./app/templates/*.hbs')
        .pipe(handlebars(data, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build/'));
    }));
});

gulp.task('json', function () {
    gulp.src('./app/assets/content/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('./build/json'));
});


gulp.task('markdown', function () {
    return gulp.src('./app/assets/content/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('./build/'));
});
