'use strict';
var postcss = require('postcss');

var  conditionalGroupRules = ['media','supports','document'];

module.exports = postcss.plugin('postcss-container', container);

function container(scope, options) {

    options = options || {};

    return function(root) {

        // guard statment- allow only valid scopes
        if(!isValidScope(scope)){
            throw root.error('invalid scope', { plugin: 'postcss-scopify' });
        }

        root.walkRules(function (rule) {

            // skip scoping of special rules (certain At-rules, nested, etc')
            if(!isRuleScopable(rule)){
                return rule;
            }

            rule.selectors = rule.selectors.map(function(selector) {
                if (isScopeApplied(selector,scope)) {
                    return selector;
                }

                // special case for a top level '&' selector, resolves to scope
                if (selector === '&') {
                    return scope;
                }

                if(selector.match(scope) !== null) {
                    return scope + ' ' + selector.replace(scope, '')
                }

                return scope + ' ' + selector;

            });
        });
    };
}

/**
 * Determine if selector is already scoped
 *
 * @param {string} selector
 * @param {string} scope
 */
function isScopeApplied(selector,scope) {
    var selectorTopScope = selector.split(" ",1)[0];
    return selectorTopScope === scope;
}

/**
 * Determine if scope is valid
 *
 * @param {string} scope
 */
function isValidScope(scope) {
    if (scope){
        return scope.indexOf(',') ===  -1;
    }
    else{
        return false;
    }

}

/**
 * Determine if rule should be scoped
 *
 * @param {rule} rule
 */
function isRuleScopable(rule){

    if(rule.parent.type !== 'root') {
        if (rule.parent.type === 'atrule' && conditionalGroupRules.indexOf(rule.parent.name) > -1){
            return true;
        }
        else {
            return false;
        }
    }

    else {
        return  true;
    }

}
