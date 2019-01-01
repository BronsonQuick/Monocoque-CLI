'use strict';

const execSync = require('child_process').execSync;
const colors = require('colors');
const config = require('./config');
const path = require('path');
const rootPath = path.dirname( require.main.filename );
colors.setTheme( require( __dirname + '/themes/logging.js' ) );

const downloadWordPress = function() {
    const configSettings = config.getConfig();
    configSettings.then(config => {
        let cwd = configSettings.projectsPath + '/' + rootPath;
        console.log( colors.yellow( 'Downloading WordPress...' ) );
    });
};

module.exports = { downloadWordPress };