var lib = require('./lib');

var options = {
    generations: 1000,
    populationSize: 30,
    elites: 1,
    mutationRate: 0.05
};

var individual = {
    x: {
        min: -1000,
        max: 1000
    },
    y: {
        min: -1000,
        max: 1000
    }
};

function problem(individual) {}


var evolve = lib();

evolve.setConfig(options);
evolve.setIndividual(individual);
//evolve.setProblem(problem);
//evolve.setPipeline();

evolve.run();
