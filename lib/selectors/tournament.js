var _ = require('lodash');

var tournamentSize = 4;
var selectionPressure = 0.75;

//TODO: add config options
function select(population) {
    var candidates = _(population)
        .sample(tournamentSize)
        .sortBy('fitness')
        .value();

    var prob = Math.random();
    for (var i = 0; i < candidates.length; i++) {
        var threshold =+ (selectionPressure) * Math.pow(1 - selectionPressure, i);
        if (prob < threshold) {
            return candidates[i];
        }
    }
    return candidates[i-1];
}

module.exports = select;