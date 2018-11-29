const _ = require("lodash");

export default function select(
  population,
  { tournamentSize = 4, selectionPressure = 0.75 } = {}
) {
  const samples = _.sampleSize(population, tournamentSize);
  const candidates = _.orderBy(samples, ["fitness"], ["desc"]);
  const prob = Math.random();
  let threshold = 0;
  let i = 0;
  for (i = 0; i < candidates.length; i++) {
    threshold += selectionPressure * Math.pow(1 - selectionPressure, i);
    if (prob < threshold) return candidates[i];
  }
  return candidates[i - 1];
}
