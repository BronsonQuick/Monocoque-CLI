'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function restart() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Restarting docker containers...' ) );
    try {
        execSync( `docker-compose restart`, { stdio: 'inherit', cwd: cwd });
        console.log( colors.success( 'Succussfully restarted Docker containers.' ));
    } catch (ex) {
        console.log( colors.error( 'Failed to restart Docker containers.' ) );
    }
};

// Run `docker-compose restart -d`