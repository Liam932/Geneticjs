var Evolve = require('../lib');

var combination = function (ind1, ind2) {
    return {
        x: (ind1.x + ind2.x) / 2
    };
};

var mutation = function () {
    return {
        x: 'random'
    };
};

var individual = {
    x: {
        min: 0,
        max: Math.PI * 2,
        type: 'float'
    }
};

function problem(ind, callback) {
    //Solution 1.5707963267948966
    setTimeout(function() {
        callback(null, Math.sin(ind.x));
    },1);
}

var options = {
    generations: 100,
    populationSize: 8,
    elites: 0,
    breeding: {
        selectionOne: 'tournament',
        selectionTwo: 'tournament',
        combinationFunction: combination
    },
    mutation: {
        mutationFunction: mutation,
        mutationRate: 0.05
    },
    individual: individual,
    problem: problem
};


var evolve = new Evolve(options);

evolve.run(function (err, solution) {
    console.log(solution);
});

