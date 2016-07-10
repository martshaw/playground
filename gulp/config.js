const dest = './build/';
const src = './app/';
const gp = './gulp';

module.exports = {
    browserSync: {
        proxy: 'http://localhost:5000',
        port: 3501,
        open: false,
        online: false,
        notify: false,
        // Lets see what we can do about this delay. Organizing tasks better might reduce it.
        reloadDelay: 3000
    },
    sass: {
        src: src + '/sass/**/*.{sass,scss}',
        dest: dest + 'css/',
        settings: {
            indentedSyntax: true, // Enable .sass syntax!
            imagePath: 'images' // Used by the image-url helper
        }
    },
    gulp: {
        src: `{gp} + /**/*.js`
    },
    lint: {
        src: [src + '/**/*.js',]
    },
    size: {
        showFiles: true,
        title: 'File Size: '
    },
    prod: {
        cssSrc: dest + '/css/*.css',
        jsSrc: dest + '/js/*.js',
        dest: dest
    }
};
