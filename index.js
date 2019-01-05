#!/usr/bin/env node
'use strict';

const colors = require('colors');
colors.setTheme( require( './src/themes/logging.js' ) );
const yargs = require('yargs');
const warn = colors.error('You need to provide at least one command.');

yargs
    .command( [ 'create', 'init' ], 'Creates a new instance of Monocoque.', require( './src/commands/create' ) )
    .command( [ 'delete', 'destroy', 'remove' ], 'Deletes the containers.', require( './src/commands/delete' ) )
    .command( [ 'down', 'halt' ], 'Stops the containers.', require( './src/commands/down' ) )
    .command( [ 'install' ], 'Install WordPress.', require( './src/commands/wordpress' ) )
    .command( [ 'restart', 'reload' ], 'Restarts the containers.', require( './src/commands/restart' ) )
    .command( 'ssh', 'SSH into the container.', require( './src/commands/ssh' ) )
    .command( 'up', 'Starts the container.', require( './src/commands/up' ) )
    .command( 'update', 'Updates all the Monocoque container images.', require( './src/commands/update' ) )
    .command( 'wp', 'Runs a WP-CLI command.', require( './src/commands/wp' ) )
    .demandCommand(1, warn)
    .help('h')
    .alias('h', 'help')
    .epilog('Coded with ❤️  by Bronson Quick https://www.bronsonquick.com.au')
    .argv;
