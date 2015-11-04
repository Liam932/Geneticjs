var Generation = require('./generation');
var Individual = require('./individual');
var _ = require('lodash');

function Evolve() {
}

Evolve.prototype = Object.create(Object.prototype);
Evolve.constructor = Evolve;


Evolve.prototype.setConfig = function (options) {
    this.generations = options.generations || 1000;
    this.populationSize = options.populationSize || 30;
    this.elites = options.elites || 1;
    this.mutationRate = options.mutationRate || 0.05;

    return this;
};

Evolve.prototype.setIndividual = function (schema) {
    this.individualSchema = schema;
    return this;
};

Evolve.prototype.initPopulation = function() {
    _.times(this.populationSize, function() {
        return new Individual(this.individualSchema);
    }, this)
};

Evolve.prototype.run = function () {
    this.initPopulation();
    this.generation = new Generation();
    for (var i = 0; i < this.generations; i++) {
        console.log(this.generation);
        this.generation = this.generation.run()
    }
    console.log(this.generation.population)
};


module.exports = function () {
    return new Evolve();
};