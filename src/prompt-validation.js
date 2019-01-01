'use strict';

const validateNotEmpty = function( value ) {
    return ( value.trim().length !== 0 ) ? true : "Please enter a valid path";
};

const validateProjectNotEmpty = function( value ) {
    return ( value.trim().length !== 0 ) ? true : "Please enter a valid project name";
};

module.exports = { validateNotEmpty, validateProjectNotEmpty };