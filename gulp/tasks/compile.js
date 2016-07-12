import gulp from 'gulp';
import closureCompiler from 'gulp-closure-compiler';
import config from '../config';

gulp.task('compile', ['buble'], () =>
    gulp.src([config.js.compiler])
    .pipe(closureCompiler({
        fileName: './build/js/scripts.min.js',
        compilerPath: './node_modules/google-closure-compiler/compiler.jar',
        compilerFlags: {
            compilation_level: 'ADVANCED',
            language_in: 'ES6_STRICT',
            language_out: 'ES5_STRICT',
            js_output_file: 'app.js',
            warning_level: 'VERBOSE',
            create_source_map: 'app.js.map',
            output_wrapper: '(function(){%output%}).call(window);',
            externs: [
                './externs/jquery.js'
            ]
        }
    }))
    .pipe(gulp.dest(config.js.dest))
);