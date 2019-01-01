'use strict';
const inquirer = require('inquirer');
const create   = require('./create');
const promptValidation = require('./prompt-validation');

module.exports = function prompt( config ) {

    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: 'What would you like to call the project?',
            validate: promptValidation.validateProjectNotEmpty
        },
        {
            type: 'list',
            name: 'phpVersion',
            message: "What version of PHP would you like to use?",
            choices: [ '7.2', '7.1', '7.0', '5.6', '5.5' ],
            default: '7.2',
        },
        {
            name: 'title',
            type: 'input',
            message: "Site Name",
            default: "Monocoque Site"
        },
        {
            name: 'username',
            type: 'input',
            message: "Admin Username",
            default: 'admin',
        },
        {
            name: 'password',
            type: 'input',
            message: "Admin Password",
            default: 'password',
        },
        {
            name: 'email',
            type: 'input',
            message: "Admin Email",
            default: 'admin@example.com',
        },
    ];

    inquirer.prompt(questions).then(answers => {
        create(answers, config);
    });
};