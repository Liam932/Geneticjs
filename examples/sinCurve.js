var lib = require('../lib');

var combination = function (ind1, ind2) {
    return {
        x: (ind1.x + ind2.x) / 2
    }
};

var mutation = function () {
    return {
        x: 'random'
    };
};

var options = {
    generations: 1000,
    populationSize: 30,
    elites: 1,
    mutationRate: 0.05,
    breeding: {
        selectionOne: 'tournament',
        selectionTwo: 'tournament',
        combinationFunction: combination,
        mutationFunction: mutation
    }
};


var individual = {
    x: {
        min: 0,
        max: Math.PI * 2,
        type: 'float'
    }
};

function problem(ind) {
    //Solution 1.5707963267948966
    return Math.sin(ind.x)
}


var evolve = lib();

var solution = evolve
    .setConfig(options)
    .setIndividual(individual)
    .setProblem(problem)
    .run();

console.log(solution);