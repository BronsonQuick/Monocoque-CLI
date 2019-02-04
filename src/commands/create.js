'use strict';

const monocoqueYaml = require('read-yaml');
const projectYaml = require('write-yaml');
const path = require('path');
const prompt = require('../prompt');
const colors = require('colors');
const envfile = require('envfile');
const fs = require('fs-extra');
const config = require('./../config');
const up = require('./up');
const wordpress = require('./wordpress');
colors.setTheme( require( './../themes/logging.js' ) );
const rootPath = path.dirname( require.main.filename );

module.exports = async function create() {

    let configSettings = await config.maybeCreateConfig();
    await prompt( configSettings );
};