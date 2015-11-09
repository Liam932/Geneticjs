function Problem(f) {
    this.fitnessFunction = f;
}

Problem.prototype = Object.create(Object.prototype);
Problem.constructor = Problem;

Problem.prototype.calculateFitness = function (individual, callback) {
    this.fitnessFunction(individual.chromosone, (err, result) => {
        callback(err, result);
    });
};

module.exports = Problem;