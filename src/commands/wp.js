'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
colors.setTheme( require( './../themes/logging.js' ) );

module.exports = function wp() {
    let cwd = process.cwd();
    try {
        execSync( 'docker-compose exec -it --user www php wp ${command}"', { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to execute the WP-CLI command.' ) );
    }
};