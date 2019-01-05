'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( '../themes/logging.js' ) );

// Update all the Monocoque Docker images.
module.exports = function update() {
    let cwd = process.cwd();
    console.log( colors.warning( 'Attempting to update Monocoque Docker containers...' ) );
    try {
        execSync( `docker pull --all-tags monocoque/monocoque`, { stdio: 'inherit', cwd: cwd });
        console.log( colors.success('Successfully updated Monocoque Docker containers.') );
    } catch (err) {
        console.log( colors.error( 'Failed to update Monocoque Docker containers.' ) );
    }
};