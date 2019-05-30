'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

module.exports = function ssh() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Logging into the container' ) );
    try {
        execSync( `docker-compose exec ${container} bash`, { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to log in to the Docker container.' ) );
    }
};
