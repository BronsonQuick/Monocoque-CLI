'use strict';

const monocoqueYaml = require('read-yaml');
const projectYaml = require('write-yaml');
const path = require('path');
const colors = require('colors');
colors.setTheme( require( __dirname + '/themes/logging.js' ) );
const rootPath = path.dirname( require.main.filename );

module.exports = async function create(answers, config) {
    return new Promise ( (resolve, reject) => {
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
        const projectPath = config.projectsPath + '/' + projectName;

        // Write the yaml file.
        projectYaml.sync(projectPath + '/docker-compose.yml', monocoqueBase);

        console.log( colors.success( 'docker-compose.yml has been created in: ' + projectPath ) );

     resolve(projectPath);
     reject(new Error("Something went wrong!"));
    });
};