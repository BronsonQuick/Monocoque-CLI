'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const prompt = require('./prompt');
const promptValidation = require('./prompt-validation');
const configPath = path.join( os.homedir(), '.monocoque' );

const maybeCreateConfig = async function() {
    // Try and create the directory for our config file.
    try {
        await fs.ensureDir( configPath );
    } catch (ex) {
        console.error( "Error: We failed to create the `~./monocoque` directory!" );
        process.exit(1);
    }

    // Try and load the config file.
    fs.readJson( configPath + '/config.json' )
        .then(config => {
            // Ask the user about the settings they need for their project.
            prompt(config);
        })
        .catch(err => {
            // We don't have a config file so let's load defaults and a prompt.
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
                        prompt(config);
                    } catch (ex) {
                        console.error( "Error: We failed to create the `~./monocoque/config.json` file!" );
                        process.exit(1);
                    }
                })
    });
};

function getDefaults() {
    return {
        'projectsPath': path.join( os.homedir(), 'monocoque-sites' )
    }
}

async function getConfig() {
    fs.readJson( configPath + '/config.json' )
        .then(config => {
            return config;
        })
        .catch(err => {
        });
}

module.exports = { maybeCreateConfig, getConfig };