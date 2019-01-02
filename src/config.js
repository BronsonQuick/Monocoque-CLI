'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const prompt = require('./prompt');
const colors = require('colors');
const promptValidation = require('./prompt-validation');
const configPath = path.join( os.homedir(), '.monocoque' );
colors.setTheme( require( __dirname + '/themes/logging.js' ) );
let config = null;

const maybeCreateConfig = async function() {
    // Try and create the directory for our config file.
    try {
        fs.ensureDir( configPath );
    } catch (ex) {
        console.log( colors.error( "Error: We failed to create the `~./monocoque` directory!" ) );
        process.exit(1);
    }

    try {
        let config = await fs.readJson( configPath + '/config.json' );
        return (config);
    } catch ( err ) {
        const configDefaults = getDefaults();

        const question = [
            {
                type: 'input',
                name: 'projectsPath',
                message: 'Which directory would you like your projects to be saved?',
                default: configDefaults.projectsPath,
                validate: promptValidation.validateNotEmpty

            }
        ];

        inquirer.prompt(question)
            .then(config => {
                // Write our project path to the config.
                // Try and create the directory for our config file.
                try {
                    fs.writeJson( configPath + '/config.json', config );
                    return (config);
                } catch (ex) {
                    console.log( colors.error( "Error: We failed to create the `~./monocoque/config.json` file!" ) );
                    process.exit(1);
                }
            })
    }

};

function getDefaults() {
    return {
        'projectsPath': path.join( os.homedir(), 'monocoque-sites' )
    }
}

module.exports = { maybeCreateConfig };