var _ = require('lodash');

function Individual(schema, chromosone) {
    this.schema = schema;
    this.fitness = undefined;
    this.chromosone = chromosone || {};
    if (!chromosone) {
        this.init();
    }
}
Individual.prototype = Object.create(Object.prototype);
Individual.constructor = Individual;

Individual.prototype.init = function () {
    for (var key in this.schema) {
        if (this.schema.hasOwnProperty(key)) {
            this.chromosone[key] = initAttribute(this.schema[key])
        }
    }
};

function initAttribute(attributeSchema) {
    if (!attributeSchema.type) {
        return 'error missing type'
    }
    if (attributeSchema.type === 'float') {
        return _.random(attributeSchema.min, attributeSchema.max, true);
    }
}

Individual.prototype.validateAttributes = function (attributes) {
    return _.every(_.keys(this.schema), function (key) {
        return _.includes(_.keys(attributes), key)
    });
};


module.exports = Individual;