// TDD Cycle
// 1. write one or more tests for a piece of functionality.
// 2. run the new tests and check that they fail (red).
// 3. write code to pass all tests (green).
// 4. improve the code so that it looks neat (refactor).
// 5. commit your code.
// 6. back to step 1 with the next piece of functionality.

// "crop" is a collection of plants of the same species, so for example a field of corn.
// "costs" is the cost of sowing one plant.
// "yield" is the yield of one plant or one crop (in kilograms).
// "sale price" is the selling price of a type of fruit or vegetable per kilo.
// "revenue" is the turnover or income of one kilo of fruit or vegetables.
// "profits" is profit, so that is revenue - costs.
// "factor" in this context is an environmental factor that influences the yield.

// berekend de opbrengst per plant
const getYieldForPlant = (plant, factors) => {
  let sunPercentage = (plant.factor.sun[factors.sun] + 100) / 100;
  let windPercentage = (plant.factor.wind[factors.wind] + 100) / 100;
  return sunPercentage * plant.yield * windPercentage;
};
//berekend de totale opbrengst van het soort plant
const getYieldForCrop = (item, factors) => {
  return item.numCrops * getYieldForPlant(item.crop, factors);
};
//berekend de totale opbrengst van de planten in de array via deze weg
//sunPercentage * totalYield * windPercentage
const getTotalYield = ({ crops }, factors) => {
  return crops
    .map((crop) => {
      return getYieldForCrop(crop, factors);
    })
    .reduce((a, b) => a + b, 0);
};

//berekend de kosten per soort plant
const getCostsForCrop = (array) => {
  return array.crop.costs * array.numCrops;
};

//berekend de omzet per soort plant via deze weg(
//   item.crop.salePrice *
//   item.numCrops *
//   item.crop.yield *
//   sunPercentage *
//   windPercentage)
const getRevenueForCrop = (item, factors) => {
  return item.crop.salePrice * getYieldForCrop(item, factors);
};

//berekend de winst per soort plant
const getProfitForCrop = (crops, factors) => {
  const cost = getCostsForCrop(crops, factors);
  const revenue = getRevenueForCrop(crops, factors);
  return revenue - cost;
};

//berekend de totale winst van alle planten in de array.
const getTotalProfit = (crops, environmentFactors) => {
  return crops
    .map((crop) => getProfitForCrop(crop, environmentFactors))
    .reduce((a, b) => a + b, 0);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
