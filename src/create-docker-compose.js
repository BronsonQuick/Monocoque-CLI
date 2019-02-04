'use strict';

const monocoqueYaml = require('read-yaml');
const projectYaml = require('write-yaml');
const path = require('path');
const colors = require('colors');
const envfile = require('envfile');
const fs = require('fs-extra');
const up = require('./commands/up');
const wordpress = require('./commands/wordpress');
colors.setTheme( require( './themes/logging.js' ) );
const rootPath = path.dirname( require.main.filename );

module.exports = async function createDockerCompose( answers, configSettings ){
    try {

        // Generate our config.env file.
        let envConfigVariables = {
            'MYSQL_ROOT_PASSWORD': 'wordpress',
            'MYSQL_DATABASE': 'wordpress',
            'MYSQL_USER': 'wordpress',
            'MYSQL_PASSWORD': 'wordpress',
            'DB_NAME': 'wordpress',
            'DB_USER': 'wordpress',
            'DB_PASSWORD': 'wordpress',
            'DB_HOST': 'db',
            'DB_PREFIX': 'wp_',
            'CERT_NAME': 'localhost',
            'HTTPS_METHOD': 'noredirect'
        };

        let envConfig = envfile.stringifySync(envConfigVariables);
        const projectPath = configSettings.projectsPath + '/' + answers.projectName;
        fs.writeFile( projectPath + '/config.env', envConfig, (err) => {
            if (err) throw err;
            console.log( colors.success( 'config.env has been created in: ' + projectPath ) );
        });

        // Generate our docker-compose.yml
        let monocoqueBase = monocoqueYaml.sync(rootPath + '/src/monocoque-base.yml');
        let php = {
            'depends_on': ['db'],
            'image': 'monocoque/monocoque:' + answers.phpVersion,
            'ports': ["80:80"],
            'volumes': [
                "./wordpress:/var/www/html",
                "./content:/var/www/html/wp-content",
                "./content/themes:/var/www/html/wp-content/themes",
                "./content/plugins:/var/www/html/wp-content/plugins",
                "./content/mu-plugins:/var/www/html/wp-content/mu-plugins",
                "./config/nginx/localhost.conf:/etc/nginx/conf.d/localhost.conf",
            ],
            'networks': ['monocoque'],
            'env_file': ['config.env']
        };

        // Append the PHP details to our base yaml file.
        monocoqueBase.services.php = php;

        // Write the yaml file.
        await projectYaml.sync(projectPath + '/docker-compose.yml', monocoqueBase);

        console.log( colors.success( 'docker-compose.yml has been created in: ' + projectPath ) );
        // Copy our config files into our new project.
        fs.copySync( __dirname + '/../config', projectPath + '/config' );

        console.log( colors.success( 'Your configuration files have been copied into: ' + projectPath ) );

        await up();
        await wordpress();

    } catch ( err ) {
        console.log(err);
        console.log( colors.error( 'We couldn\'t copy the config files' ) );
    }
};