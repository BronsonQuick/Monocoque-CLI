'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
const config = require('./config');
const path = require('path');
const rootPath = path.dirname( require.main.filename );
colors.setTheme( require( __dirname + '/themes/logging.js' ) );

const downloadWordPress = function() {
    let configSettings = config.maybeCreateConfig();
    configSettings.then(config => {
        console.log( colors.warning( 'Downloading WordPress...' ) );
        let cwd = configSettings.projectsPath + '/' + rootPath;
    });
};

module.exports = { downloadWordPress };