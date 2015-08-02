#! /usr/bin/env nodejs

// CAST-CENTRAL-WEB
// ----------------

var sass = require('node-sass'),
    compressor = require('node-minify'),
    fs = require('fs'),
    glob = require('glob'),
    async = require('async');

// When invoked will start a production server using 
// minimized css, images, html, and js.

async.series([
    clean,
    compile_sass,
    compress_css,
    compress_js
], function(err, results){
    run_server();
});

// Clean the target dir
function clean(cb){
    console.log('Cleaning...');
    glob('target/*', function(files){
        for(f in files){
            fs.unlinkSync(files[f]);
        }

        cb(null);
    });
}

// Compile sass files
function compile_sass(cb){
    console.log('Compiling sass...');
    var css = sass.renderSync({
        file: 'resources/sass/style.scss',
        includePaths: [
            'resources/sass/breakpoints',
            'resources/sass/modules',
            'resources/sass/partials'
        ]
    });

    fs.writeFileSync('target/style.compiled.css', css.css);
    cb(null);
}

// Compress JS
function compress_js(cb){
    console.log('Compressing javascript...');
    new compressor.minify({
        type: 'yui-js',
        fileIn: glob_arr_patterns([
            'bower_components/**/*.min.js',
            'app.js',
            'config.js',
            'modules/**/*.js'
        ]),
        fileOut: 'target/app.min.js',
        callback: function(err, min){
            cb(err);
        }
    });
}

// Compress CSS
function compress_css(cb){
    console.log('Compressing css...');
    new compressor.minify({
        type: 'yui-css',
        fileIn: [
            'target/style.compiled.css'
        ],
        fileOut: 'target/style.min.css',
        callback: function(err, min){
            cb(err);
        }
    });
}

// Compress Images
function compress_images(cb){
    cb(null);
}

// Compress HTML
function compress_html(cb){
    cb(null);
}

// Run server
function run_server(){
    console.log('Starting server at <port>.');
}

// Given an array of patterns, 
// return the glob files found in 
// and array for each.
function glob_arr_patterns(patterns){
    var files = [];

    for(pattern in patterns){
        files = files.concat(glob.sync(patterns[pattern]));
    }

    return(files);
}
