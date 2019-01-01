#!/usr/bin/env node
'use strict';

const config = require('./src/config');

const init = async function() {
    await config.maybeCreateConfig();
};

// Initialise the program.
init();