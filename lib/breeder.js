var _ = require('lodash');
var selectors = require('./selectors');
var Individual = require('./individual');

function Breeder(options) {
    this.selectorOne = options.selectionOne;
    this.selectorTwo = options.selectionTwo;
    this.combination = options.combinationFunction;
    this.mutation = options.mutationFunction
}

Breeder.prototype = Object.create(Object.prototype);
Breeder.constructor = Breeder;

Breeder.prototype.breed = function (ind, index, population) {
    var child;
    //Selection
    var ind1 = selectors[this.selectorOne](population);
    var ind2 = selectors[this.selectorTwo](population);

    var attributeMap = this.combination(ind1.chromosone, ind2.chromosone);
    attributeMap = _.pick(attributeMap, function(value, key) {
        //if in both schema and the attribute map
        return attributeMap.hasOwnProperty(key) && ind1.schema.hasOwnProperty(key);
    });

    if(ind1.validateAttributes(attributeMap)) {
        child = new Individual(ind1.schema, attributeMap)
    } else {
        console.log('error in child');
    }
    return child;
};

module.exports = Breeder;
