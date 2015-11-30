module.exports = {
    generations: 1000,
    populationSize: 30,
    elites: 1,
    selection: 'tournament',
    mutationRate: 0.05,
    tournament: {
        tournamentSize: 4,
        selectionPressure: 0.75
    }
};
