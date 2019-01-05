'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
const config = require('../config');
const path = require('path');
const rootPath = path.dirname( require.main.filename );
colors.setTheme( require( './../themes/logging.js' ) );

module.exports = function wordpress() {
    console.log( colors.warning( 'Downloading WordPress...' ) );
    let cwd = process.cwd();
    try {
        execSync( 'docker-compose exec php su -s /bin/bash www -c "wp core download --force"', { stdio: 'inherit', cwd: cwd });
    } catch (ex) {
        console.log( colors.error( 'Failed to download WordPress' ) );
    }
};