'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function up() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Starting Docker containers...' ) );
    try {
        execSync( `docker-compose up`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to start Docker containers.' ) );
    }
};