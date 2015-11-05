var _ = require('lodash');
var Individual = require('./Individual');

function Mutator(options) {
    this.rate = options.mutationRate || 0.05;
    this.mutationFunction = options.mutationFunction;
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
        console.log('error in child');
    }
};

module.exports = Mutator;