var selectors = require('./selectors');

function Breeder(options) {
    this.selectorOne = options.selectionOne;
    this.selectorTwo = options.selectionTwo;
    this.combination = options.combination;
    this.mutation = options.mutation
}

Breeder.prototype = Object.create(Object.prototype);
Breeder.constructor = Breeder;

Breeder.prototype.breed = function(ind , index, population) {
    var ind1 = selectors[this.selectorOne](population);
    var ind2 = selectors[this.selectorOne](population);
    return ind1;
};

module.exports = Breeder;