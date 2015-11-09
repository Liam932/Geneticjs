function Problem(f) {
    this.fitnessFunction = f;
}

Problem.prototype = Object.create(Object.prototype);
Problem.constructor = Problem;

Problem.prototype.calculateFitness = function (individual, callback) {
    //return this.fitnessFunction(individual.chromosone);
    this.fitnessFunction(individual.chromosone, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
    //callback(null, this.fitnessFunction(individual.chromosone));
};

module.exports = Problem;