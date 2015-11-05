function Individual(schema) {
    this.schema = schema;
    this.fitness = undefined;

}

Individual.prototype = Object.create(Object.prototype);
Individual.constructor = Individual;

function init() {
    for(var key in this.schema) {

    }
}


module.exports = Individual;