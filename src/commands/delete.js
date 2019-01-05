'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function remove() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Deleting docker containers...' ) );
    try {
        execSync( `docker-compose down -v`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to delete Docker containers.' ) );
    }
};