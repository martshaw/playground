const dest = './build/';
const src = './app/';
const gp = './gulp/';
const prod = process.env.NODE_ENV === 'production';

module.exports = {
    nodeEnv: prod,
    browserSync: {
        port: 3501,
        open: false,
        online: false,
        notify: false,
        server: {
          // Serve up our build folder
            baseDir: dest,
        }
    },
    sass: {
        src: `${src}/sass/**/*.{sass,scss}`,
        dest: `${dest}/css/`,
        settings: {
            indentedSyntax: true, // Enable .sass syntax!
            imagePath: 'images' // Used by the image-url helper
        }
    },
    templates: {
        src: `${src}assets/templates/**/*`
    },
    markdown: {
        src: `${src}assets/content/**/*`,
        dest: `${src}json/`
    },
    gulp: {
        src: `${gp}**/*.js`
    },
    js: {
        src: `${src}js/**/*.js`,
        buble: `${src}js/app.js`,
        dest: `${dest}js/`,
        compiler: `${dest}js/app.js`,
    },
    size: {
        showFiles: true,
        title: 'File Size: '
    },
    assets: {
        images: {
            src: `${src}assets/images/**/*`,
            dest: `${dest}images/`
        }
    },
    cssSrc: `${dest}css/*.css`,
    jsSrc: `${dest}js/*.js`,
    dest: `${dest}`

};
