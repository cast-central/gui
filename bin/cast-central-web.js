#! /usr/bin/env nodejs

// CAST-CENTRAL-WEB
// ----------------

var sass       = require('node-sass'),
    compressor = require('node-minify'),
    fs         = require('fs'),
    glob       = require('glob'),
    async      = require('async'),
    execSync   = require('exec-sync'),
    express    = require('express'),
    opts       = require('optimist')
        .usage(
            'Manages the cast-central-web application server.\n'+
            'Usage: $0 <options>'
        )
        .describe('host', 'The hostname/ip of the server to bind to').default('host', 'localhost')
        .describe('port', 'The port of the server to bind to').default('port', '8001')
        .alias('c', 'clean').describe('c', 'Clean out the target directory compiled/compressed code')
        .alias('b', 'build').describe('b', 'Build and compress the web code and place in the target dir')
        .alias('r', 'run').describe('r', 'Start the web server using the compiled/compressed code')
        .alias('d', 'dev').describe('d', 'Adds test dependencies to target dir')
        .alias('t', 'target').describe('t', 'Target directory for building/cleaning/starting').default('t', 'target/')
        .alias('h', 'help').describe('h', 'Shows this usage'),
    argv = opts.argv;

// When invoked will start a production server using 
// minimized css, images, html, and js.

// Get current script location, all locations are 
// relative to this location.
var prefix = process.argv[1].split('/');
prefix.pop();
prefix = prefix.join('/') + '/../';

// Process the options given
if(argv.help){
    opts.showHelp();
    process.exit(0);
}else{
    async.series(get_steps(), function(err, results){
        if(err){
            console.log('Error: ', err);
            process.exit(1);
        }else{
            if(argv.run){ run_server(); }
        }
    });
}

// Clean the target dir
function clean(cb){
    console.log('Cleaning...');
    execSync('/bin/rm -r '+prefix+argv.target+'*');
    cb(null);
}

// Compile sass files
function compile_sass(cb){
    console.log('Compiling sass...');
    var css = sass.renderSync({
        file: prefix+'resources/sass/style.scss',
        includePaths: [
            prefix+'resources/sass/breakpoints',
            prefix+'resources/sass/modules',
            prefix+'resources/sass/partials'
        ]
    });

    fs.writeFileSync(prefix+argv.target+'style.compiled.css', css.css);
    cb(null);
}

// Compress JS
function compress_js(cb){
    console.log('Compressing javascript...');
    new compressor.minify({
        type: 'yui-js',
        fileIn: glob_arr_patterns([
            // Order matters here
            prefix+'bower_components/angular/*.min.js',
            prefix+'bower_components/angular-route/*.min.js',

            // Modules/Common
            prefix+'modules/common/module.js',
            prefix+'modules/common/main.header.directive.js',
            prefix+'modules/common/main.footer.directive.js',

            // Modules/Howto
            prefix+'modules/howto/module.js',

            // Modules/Casts
            prefix+'modules/casts/module.js',
            prefix+'modules/casts/casts.controller.js',
            prefix+'modules/casts/casts.factory.js',
            prefix+'modules/casts/casts.directive.js',

            // Main
            prefix+'app.js',
            prefix+'config.js'
        ]),
        fileOut: prefix+argv.target+'app.min.js',
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
            prefix+argv.target+'style.compiled.css'
        ],
        fileOut: prefix+argv.target+'style.min.css',
        callback: function(err, min){
            cb(err);
        }
    });
}

// Images
function images(cb){
    console.log('Moving images...');
    execSync('/bin/cp -r '+prefix+'resources/images '+prefix+argv.target);
    cb(null);
}

// HTML
function html(cb){
    console.log('Moving html...');
    execSync('/bin/cp '+prefix+'*.html '+prefix+'modules/**/*.html '+prefix+argv.target);
    cb(null);
}

// Test
function test(cb){
    console.log('Moving test fixtures...');
    execSync('/bin/cp -r '+prefix+'resources/data '+prefix+argv.target);
    cb(null);
}

// Run server
function run_server(){
    console.log('Starting server at '+argv.host+':'+argv.port+'.');

    var app    = express().use(express.static(prefix+argv.target)),
        server = app.listen(argv.port);

    /*if(argv.dev){
        fs.watch(prefix, function(event, filename){
            console.log('File change detected...')
            async.series(get_steps(), function(err, results){  });
        });
    }*/
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

// Uses the options given and returns 
// the order of functions to call.
function get_steps(){
    var steps = [];

    if(argv.clean){ steps.push(clean); }
    if(argv.build){
        steps.push(compile_sass);
        steps.push(compress_css);
        steps.push(compress_js);
        steps.push(images);
        steps.push(html);
    }
    if(argv.dev){ steps.push(test); }

    return(steps);
}
