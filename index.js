#!/usr/bin/env node
'use strict';

const figlet = require('figlet');
const config = require('./src/config');
const prompt = require('./src/prompt');
const wordpress = require('./src/wordpress');
const colors = require('colors');
const up = require('./src/commands/up');
colors.setTheme( require( './src/themes/logging.js' ) );

const init = async function() {

    // Generate an ascii logo.
    await figlet('Monocoque', function(err, data) {
        if (err) {
            console.log(colors.error( 'Something went wrong with our logo' ));
            return;
        }
        console.log(data);
    });

    let configSettings = await config.maybeCreateConfig();
    let projectPath = prompt( configSettings );
    // wordpress.downloadWordPress();
};

// Initialise the program.
init();