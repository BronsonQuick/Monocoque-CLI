#!/usr/bin/env node
'use strict';

const config = require('./src/config');
const prompt = require('./src/prompt');
const wordpress = require('./src/wordpress');

const init = async function() {
    let configSettings = await config.maybeCreateConfig();
    await prompt( configSettings );
    wordpress.downloadWordPress();
};

// Initialise the program.
init();