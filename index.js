var lib = require('./lib');

var combination = function(ind1, ind2) {
    return {
        x: (ind1.x + ind2.x) / 2,
        y: (ind1.y + ind2.y) / 2
    };
};

var mutation = function() {
  return {
      x: 'random', // function(attr)
      y: 'random'
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
    //y: {
    //    min: -1000,
    //    max: 1000,
    //    type: 'float'
    //}
};

function problem(ind) {
    //Solution 1.5707963267948966
    return Math.sin(ind.x)
}


var evolve = lib();

evolve.setConfig(options);
evolve.setIndividual(individual);
evolve.setProblem(problem);

evolve.run();
