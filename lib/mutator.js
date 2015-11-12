var _ = require('lodash');
var Individual = require('./Individual');
var defaults = require('./defaults');

function Mutator(options) {
    options = options || {};
    this.rate = options.mutationRate || defaults.mutationRate;
    if(typeof options.mutationFunction !== 'function') {
        console.error('options provided: ', options);
        throw new Error('Mutation function must exist');
    } else {
        this.mutationFunction = options.mutationFunction;
    }
}

Mutator.prototype = Object.create(Object.prototype);

Mutator.constructor = Mutator;

Mutator.prototype.mutate = function (individual) {
    var attributeMap = this.mutationFunction(individual.chromosone);
    attributeMap = _(attributeMap).pick(function (value, key) {
        //if in both schema and the attribute map
        return attributeMap.hasOwnProperty(key) && individual.schema.hasOwnProperty(key);
    }).mapValues(function (property, key) {
        if (Math.random() < this.rate) {
            if (property === 'random') {
                return individual.initAttribute(individual.schema[key]);
            } else {
                return property;
            }
        } else {
            return individual.chromosone[key];
        }
    }, this).value();

    if (individual.validateAttributes(attributeMap)) {
        return new Individual(individual.schema, attributeMap);
    } else {
        console.error('failed to validate individuals attributes during mutation', individual.schema, attributeMap);
        throw new Error('failed to validate individuals attributes during mutation');
    }
};

module.exports = Mutator;