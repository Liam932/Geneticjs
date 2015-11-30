var _ = require('lodash');
var defaults = require('../config/defaults.js');

//TODO: add config options
function select(population, config) {
    config = config || {};
    var tournamentSize = config.tournamentSize || defaults.tournament.tournamentSize;
    var selectionPressure = config.selectionPressure || defaults.tournament.selectionPressure;

    var candidates = _.chain(population)
        .sample(tournamentSize)
        .sortByOrder('fitness', 'desc')
        .value();

    var prob = Math.random();
    for (var i = 0; i < candidates.length; i++) {
        var threshold = +(selectionPressure) * Math.pow(1 - selectionPressure, i);
        if (prob < threshold) {
            return candidates[i];
        }
    }
    return candidates[i - 1];
}

module.exports = select;