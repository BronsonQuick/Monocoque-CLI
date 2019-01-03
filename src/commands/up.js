'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = async function up( projectPath ) {
    let cwd = projectPath;
    console.log( colors.warning( 'Starting docker containers...' ) );
    try {
        execSync( `docker-compose up -d`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to start docker containers.' ) );
    }
};