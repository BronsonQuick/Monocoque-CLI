#!/usr/bin/env node
'use strict';

const figlet = require('figlet');
const config = require('./src/config');
const prompt = require('./src/prompt');
const wordpress = require('./src/wordpress');
const colors = require('colors');
const up = require('./src/commands/up');
colors.setTheme( require( './src/themes/logging.js' ) );
const yargs = require('yargs');

const warn = colors.error('You need to provide at least one command.')
yargs
    .command( 'delete', 'Deletes the containers.', require( './src/commands/delete' ) )
    .command( 'down', 'Stops the containers.', require( './src/commands/down' ) )
    .command( 'restart', 'Restarts the containers.', require( './src/commands/restart' ) )
    .command( 'ssh', 'SSH into the container.', require( './src/commands/ssh' ) )
    .command( 'up', 'Starts the container.', require( './src/commands/up' ) )
    .command( 'wp', 'Runs a WP-CLI command.', require( './src/commands/wp' ) )
    .demandCommand(1, warn)
    .help('h')
    .alias('h', 'help')
    .epilog('Coded with ❤️  by Bronson Quick https://www.bronsonquick.com.au')
    .argv;

// const init = async function() {
//
//     // Generate an ascii logo.
//     await figlet('Monocoque', function(err, data) {
//         if (err) {
//             console.log(colors.error( 'Something went wrong with our logo' ));
//             return;
//         }
//         console.log(data);
//     });
//
//     let configSettings = await config.maybeCreateConfig();
//     let projectPath = prompt( configSettings );
//     // wordpress.downloadWordPress();
// };
//
// // Initialise the program.
// init();