#!/usr/bin/env node
'use strict';

const config = require('./src/config');
const wordpress = require('./src/wordpress');

const init = async function() {
    await config.maybeCreateConfig();
    // wordpress.downloadWordPress();
};

// Initialise the program.
init();