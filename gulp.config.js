var source = './src/',
    assets = 'assets/',
    components = './../components-development-submodule/',
    build = './build/',
    bowerFiles = './bower_components/',
    npmFiles = './node_modules',
    compile = './compile/',
    index = 'index.html',
    root = __dirname,
    gulp_dir = './gulp/',
    fs = require('fs');

module.exports = {
    bowerFiles: bowerFiles,
    npmFiles: npmFiles,
    src: source,
    build: build,
    compile: compile,
    assets: assets,
    appCss: assets + 'styles/',
    appFonts: assets + 'fonts/',
    appImages: assets + 'images/',
    root: root,
    gulp: gulp_dir,
    index: source + index,
    styles: [
        source + '**/*.css',
        source + '**/*.less'
    ],
    templates: [
        '!' + source + index,
        source + 'app/**/*.html'
    ],
    scripts: [
        source + 'app/**/*.js',
        '!' + source + '**/*.spec.js',
        '!' + source + '**/*.test.js'
    ],
    components: {
        dir: components,
        scripts: [
            components + '**/*.js',
            '!' + components + '**/*.spec.js',
            '!' + components + '**/*.test.js'
        ],
        templates: components + '**/*.html',
        styles: {
            less: components + '**/*.less',
            css: components + '**/*.css'
        }
    },
    appFiles: [
        build + '**/app.js',
        build + '**/*.js',
        build + '**/*.css',
        source + '**/*.css'
    ],
    wrapper: {
        header: '(function() {\n"use strict";\n',
        footer: '}());'
    },
    templateCacheSettings: {
        standalone: false,
        moduleSystem: 'IIFE',
        module: 'orderCloud'
    },
    ngConstantSettings: {
        name: 'orderCloud',
        deps: false,
        constants: getConstants()
    },
    autoprefixerSettings: {
        browsers: ['last 2 versions'],
        cascade: true
    },
    jsCache: 'jsscripts',
    indentSize: 4
};

function getConstants() {
    var result = {};
    var constants = JSON.parse(fs.readFileSync(source + 'app/app.config.json'));
    result.appname = constants.appname;
    result.firebasedatabaseurl = constants.firebasedatabaseurl;
    result.firebaseauthdomain = constants.firebaseauthdomain;
    result.firebaseapikey = constants.firebaseapikey;
    return result;
}
