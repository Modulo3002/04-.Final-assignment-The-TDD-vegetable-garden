const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };
  const environmentFactors = {
    sun: "low",
    wind: "low",
  };
  test("Get yield for plant WITH low environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });
  test("Get yield for plant WITH high environment factors", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(22.5);
  });
  test("Get yield for plant WITH medium environment factors", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(22.5);
  });
});

describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };
  const environmentFactors = {
    sun: "low",
    wind: "low",
  };
  const input = {
    crop: corn,
    numCrops: 10,
  };

  test("Get yield for crop with low enviromentFactors", () => {
    expect(getYieldForCrop(input, environmentFactors)).toBe(15);
  });
  test("Get yield for crop with high enviromentFactors", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(22.5);
  });
  test("Get yield for crop with medium enviromentFactors", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(22.5);
  });
});

describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };
  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
  ];

  const environmentFactors = {
    sun: "medium",
    wind: "low",
  };

  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ crops }, environmentFactors)).toBe(23);
  });
  test("Calculate total yield multiple crops, high environmentFasctors", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(17.25);
  });

  test("Calculate total yield multiple crops, low environmentFasctors", () => {
    const environmentFactors = {
      sun: "low",
      wind: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(11.5);
  });

  test("Calculate total yield multiple crops, medium environmentFactors", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(17.25);
  });
});
describe("geCostsForCrop", () => {
  const corn = {
    name: "corn",
    costs: 1,
  };
  const crops = { crop: corn, numCrops: 5 };
  expect(getCostsForCrop(crops)).toBe(5);
});

describe("getRevenueForCrop", () => {
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 3,
    salePrice: 5,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
    wind: "high",
  };
  const crops = { crop: pumpkin, numCrops: 2 };
  test("Calculate revenue for crop", () => {
    expect(getRevenueForCrop(crops, environmentFactors)).toBe(10);
  });
  test("Calculate revenue for crop, medium", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getRevenueForCrop(crops, environmentFactors)).toBe(30);
  });
  test("Calculate revenue for crop, low", () => {
    const environmentFactors = {
      sun: "low",
      wind: "low",
    };
    expect(getRevenueForCrop(crops, environmentFactors)).toBe(20);
  });
  test("Calculate revenue for crop, high", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getRevenueForCrop(crops, environmentFactors)).toBe(30);
  });
});

describe("getProfitForCrop", () => {
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 3,
    salePrice: 5,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
    wind: "high",
  };
  const crops = { crop: pumpkin, numCrops: 30 };
  test("calculate profit for crop", () => {
    expect(getProfitForCrop(crops, environmentFactors)).toBe(60);
  });
  test("calculate profit for crop, high high", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getProfitForCrop(crops, environmentFactors)).toBe(360);
  });
  test("calculate profit for crop, medium medium", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getProfitForCrop(crops, environmentFactors)).toBe(360);
  });
  test("calculate profit for crop, low low", () => {
    const environmentFactors = {
      sun: "low",
      wind: "low",
    };
    expect(getProfitForCrop(crops, environmentFactors)).toBe(210);
  });
});

describe("getTotalProfit", () => {
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 3,
    salePrice: 5,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
    salePrice: 2,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -25,
        high: -50,
      },
    },
  };

  const crops = [
    { crop: pumpkin, numCrops: 30 },
    { crop: corn, numCrops: 50 },
  ];
  const environmentFactors = {
    sun: "low",
    wind: "high",
  };
  test("calculate total profit low and high", () => {
    expect(getTotalProfit(crops, environmentFactors)).toBe(85);
  });
  test("calculate total profit low and low", () => {
    const environmentFactors = {
      sun: "low",
      wind: "low",
    };
    expect(getTotalProfit(crops, environmentFactors)).toBe(310);
  });
  test("calculate total profit medium and medium", () => {
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
    };
    expect(getTotalProfit(crops, environmentFactors)).toBe(535);
  });
  test("calculate total profit high and high", () => {
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getTotalProfit(crops, environmentFactors)).toBe(535);
  });
  test("calculate total profit high and low", () => {
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    expect(getTotalProfit(crops, environmentFactors)).toBe(1210);
  });
});
