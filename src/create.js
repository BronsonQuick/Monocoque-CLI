'use strict';

const monocoqueYaml = require('read-yaml');
const projectYaml = require('write-yaml');
const path = require('path');
const rootPath = path.dirname( require.main.filename );

module.exports = function create(answers, config) {
    let monocoqueBase = monocoqueYaml.sync(rootPath + '/src/monocoque-base.yml');
    let php = {
        'depends_on': ['db'],
        'image': 'monocoque/monocoque:' + answers.phpVersion,
        'ports': ["80:80"],
        'volumes': [
            "./content:/var/www/html/wp-content",
            "./content/themes:/var/www/html/wp-content/themes",
            "./content/plugins:/var/www/html/wp-content/plugins",
            "./content/mu-plugins:/var/www/html/wp-content/mu-plugins"
        ],
        'networks': ['monocoque'],
        'env_file': ['config.env']
    };

    // Append the PHP details to our base yaml file.
    monocoqueBase.services.php = php;

    const projectName = path.normalize( answers.projectName );

    // Write the yaml file.
    projectYaml.sync(config.projectsPath + '/' + projectName + '/docker-compose.yml', monocoqueBase);
};