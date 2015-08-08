#! /usr/bin/env node

// CAST-CENTRAL-WEB
// ----------------

var sass       = require('node-sass'),
    compressor = require('node-minify'),
    fs         = require('fs'),
    glob       = require('glob'),
    async      = require('async'),
    execSync   = require('exec-sync'),
    express    = require('express'),
    chokidar   = require('chokidar'),
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
        .describe('config', 'Config directory').default('config', 'config/')
        .alias('h', 'help').describe('h', 'Shows this usage'),
    argv = opts.argv;

// When invoked will start a production server using 
// minimized css, images, html, and js.

// Get current script location, all locations are 
// relative to this location.
var prefix = process.argv[1].split('/');
prefix.pop();
prefix = prefix.join('/') + '/../';

var config = load_config();
var build_finished = true;

// Process the options given
if(argv.help){
    opts.showHelp();
    process.exit(0);
}else{
    build_finished = false;
    async.series(get_steps(), function(err, results){
        if(err){
            error(err);
        }else{
            build_finished = true;
            if(argv.run){ run_server(); }
        }
    });
}

// Clean the target dir
function clean(cb){
    console.log('Cleaning...');
    execSync('/bin/rm -rf '+prefix+argv.target);
    execSync('/bin/mkdir -p '+prefix+argv.target);
    cb(null);
}

// Compile sass files
function compile_sass(cb){
    console.log('Compiling sass...');
    var css = sass.renderSync({
        file: prefix+config.dependencies.sass.main,
        includePaths: glob_arr_patterns(config.dependencies.sass.paths)
    });

    fs.writeFileSync(prefix+argv.target+config.dependencies.sass.target, css.css);
    cb(null);
}

// Compress JS
function compress_js(cb){
    console.log('Compressing javascript...');
    new compressor.minify({
        type: config.dependencies.javascript.compress? 'no-compress': 'yui-js',
        fileIn: glob_arr_patterns(config.dependencies.javascript.paths),
        fileOut: prefix+argv.target+config.dependencies.javascript.target,
        callback: function(err, min){
            cb(err);
        }
    });
}

// Compress CSS
function compress_css(cb){
    console.log('Compressing css...');
    new compressor.minify({
        type: config.dependencies.css.dev? 'no-compress': 'yui-css',
        fileIn: glob_arr_patterns(config.dependencies.css.paths),
        fileOut: prefix+argv.target+config.dependencies.css.target,
        callback: function(err, min){
            cb(err);
        }
    });
}

// Images
function images(cb){
    console.log('Moving images...');
    var images = convert_paths_command(glob_arr_patterns(config.dependencies.images.paths));
    execSync('/bin/cp '+images+' '+prefix+argv.target+config.dependencies.images.target);
    cb(null);
}

// HTML
function html(cb){
    console.log('Moving html...');
    var html = convert_paths_command(glob_arr_patterns(config.dependencies.html.paths));
    execSync('/bin/cp '+html+' '+prefix+argv.target+config.dependencies.html.target);
    cb(null);
}

// Run server
function run_server(){
    console.log('Starting server at '+argv.host+':'+argv.port+'.');

    if(argv.dev){
        chokidar.watch(glob_arr_patterns(config_paths()), {
            ignored: /[\/\\]\./,
            persistent: true,
            depth: 5
        }).on('ready', function(){
            console.log('Watching for changes...');
        }).on('change', function(path){
            if(build_finished){
                console.log('Rebuilding...');
                config = load_config();
                build_finished = false;
                async.series(get_steps(), function(err, results){
                    if(err){ error(err); }
                    build_finished = true;
                });
            }
        }).on('error', function(err){ error(err); });
    }

    express().use(express.static(prefix+argv.target)).listen(argv.port);
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

    return(steps);
}

// Given an err object prints and exits the 
// current process.
function error(err){
    console.log('Error:', err);
    process.exit(1);
}

// Loads the configuration file.
function load_config(){
    return(new (require(prefix+argv.config+'config.js'))(argv.target, argv.dev));
}

// Returns all config paths mrged into one 
// array.
function config_paths(){
    paths = [];

    for(var dependency in config.dependencies){
        for(var path in config.dependencies[dependency].paths){
            paths.push(prefix+config.dependencies[dependency].paths[path]);
        }
    }

    paths.push(prefix+config.dependencies.sass.main);
    paths.push(prefix+argv.config+'config.js');
    return(paths);
}

// Converts an array to be a string 
// space seperated with prefix prepended 
// to each item.
function convert_paths_command(paths){
    var command_string = '';

    for(var path in paths){
        command_string += prefix+paths[path] + ' ';
    }

    return(command_string);
}
