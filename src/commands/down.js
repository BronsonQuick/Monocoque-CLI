'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function down() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Stopping docker containers...' ) );
    try {
        execSync( `docker-compose down -d`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to stop Docker containers.' ) );
    }
};