import gulp from 'gulp';
import closureCompiler from 'gulp-closure-compiler';

gulp.task('compile', function() {
  return gulp.src(['./build/app.js'])
    .pipe(closureCompiler({
        fileName: 'build.js',
        compilerPath: './node_modules/closure-compiler/node_modules/google-closure-compiler/compiler.jar',
        compilerFlags: {
            compilation_level: 'ADVANCED',
            language_in: 'ES6_STRICT',
            language_out: 'ES5_STRICT',
            js_output_file: 'app.js',
            warning_level: 'VERBOSE'
        }
    }))
    .pipe(gulp.dest('./build/'));
});