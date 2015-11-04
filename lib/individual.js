function Individual(schema) {
    this.schema = schema;
    this.fitness = undefined;
}

Individual.prototype = Object.create(Object.prototype);
Individual.constructor = Individual;


module.exports = Individual;