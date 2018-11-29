const _ = require("lodash");

export default function select(
  population,
  { tournamentSize = 4, selectionPressure = 1 } = {}
) {
  const samples = _.sampleSize(population, tournamentSize);
  const candidates = _.orderBy(samples, ["fitness"], ["desc"]);

  const prob = Math.random();
  for (var i = 0; i < candidates.length; i++) {
    var threshold = +selectionPressure * Math.pow(1 - selectionPressure, i);
    if (prob < threshold) {
      return candidates[i];
    }
  }
  return candidates[i - 1];
}
