'use strict';
var inquirer = require('inquirer');
var create   = require('./create');

module.exports = function prompt() {

    const questions = [
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
        create(answers);
    });
};