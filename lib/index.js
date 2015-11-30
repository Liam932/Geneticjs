var Generation = require('./generation');
var Individual = require('./individual');
var Breeder = require('./breeder');
var Mutator = require('./mutator');
var Problem = require('./problem');
var defaults = require('./config/defaults');
var _ = require('lodash');
var async = require('async');

function Evolve(options) {
    options = options || {};
    this.generations = options.generations || defaults.generations;
    this.populationSize = options.populationSize || defaults.populationSize;
    this.elites = options.elites || defaults.elites;

    this.breeder = new Breeder(options.breeding);

    //Allows for mutation to be toggled
    if(options.mutation) {
        this.mutator = new Mutator(options.mutation);
    }

    this.individualSchema = options.individual;
    this.problem = new Problem(options.problem);
    this.generation = new Generation(this.initPopulation(), this.breeder, this.mutator, this.problem, this.elites);

}

Evolve.prototype = Object.create(Object.prototype);

Evolve.prototype.initPopulation = function () {
    return _.times(this.populationSize, function () {
        return new Individual(this.individualSchema);
    }, this);
};

Evolve.prototype.validatePreconditions = function() {
    return this.individualSchema && this.problem && this.generation;
};

Evolve.prototype.run = function (callback) {
    var index = 0;
    if(!this.validatePreconditions()) {
        console.error('Invalid config', this);
        return callback('Cant start, preconditions not met');
    }
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

module.exports = Evolve;