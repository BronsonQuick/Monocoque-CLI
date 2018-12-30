'use strict';

let monocoqueYaml = require('read-yaml');
let projectYaml = require('write-yaml');

module.exports = function create(answers) {
    let monocoqueBase = monocoqueYaml.sync('./src/monocoque-base.yml');
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

    monocoqueBase.services.php = php;

    projectYaml.sync('docker-compose.yml', monocoqueBase);
};