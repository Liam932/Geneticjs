var Generation = require('./generation');
var Individual = require('./individual');
var Breeder = require('./breeder');
var Mutator = require('./mutator');
var Problem = require('./problem');
var _ = require('lodash');
var async = require('async');

function Evolve() {
}

Evolve.prototype = Object.create(Object.prototype);
Evolve.constructor = Evolve;


Evolve.prototype.setConfig = function (options) {
    this.generations = options.generations || 1000;
    this.populationSize = options.populationSize || 30;
    this.elites = options.elites || 1;

    this.breeder = new Breeder(options.breeding);
    this.mutator = new Mutator(options.mutation);
    return this;
};

Evolve.prototype.setIndividual = function (schema) {
    this.individualSchema = schema;
    return this;
};

Evolve.prototype.setProblem = function (problem) {
    this.problem = new Problem(problem);
    return this;
};

Evolve.prototype.initPopulation = function () {
    return _.times(this.populationSize, function () {
        return new Individual(this.individualSchema);
    }, this);
};

Evolve.prototype.run = function (callback) {
    var index = 0;
    this.generation = new Generation(this.initPopulation(), this.breeder, this.mutator, this.problem, this.elites);

    async.whilst(() => { return index < this.generations; },
        (callback) => {
            index++;
            this.generation.run((err, newGeneration) => {
                if (err) {
                    return callback(err);
                }
                this.generation = newGeneration;
                return callback();
            });
        },
        (err) => {
            if (err) {
                return callback(err);
            }
            this.generation.calculateFitness();
            var bestIndividual = this.generation.selectBestIndividual();
            return callback(null, bestIndividual.chromosone);
        });
};

module.exports = function () {
    return new Evolve();
};