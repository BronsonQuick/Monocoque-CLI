'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function up( projectPath = process.cwd() ) {
    let cwd = projectPath;
    console.log( colors.warning( 'Starting Docker containers...' ) );
    try {
        execSync( `docker-compose up -d`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to start Docker containers.' ) );
    }
};