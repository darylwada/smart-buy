function forecastHomeValue(startingValue, appreciationRate) {
  const forecast = []
  for (let i = 0; i <= 360; i++) {
    forecast.push(startingValue * Math.pow(1 + appreciationRate / 12, i))
  }
  return forecast
}

function calculateMortgagePayment(principal, interestRate) {
  return principal * (interestRate / 12 * Math.pow(1 + interestRate / 12, 360)) / (Math.pow(1 + interestRate / 12, 360) - 1)
}

function forecastDebt(principal, interestRate, mortgagePayment) {
  const debt = [principal]
  const monthlyPrincipal = []
  const monthlyInterest = []
  for (let i = 0; i <= 360; i++) {
    monthlyInterest.push(debt[i] * interestRate / 12)
    monthlyPrincipal.push(mortgagePayment - monthlyInterest[i])
    debt.push(debt[i] - monthlyPrincipal[i])
  }
  return {
    debtInterest: monthlyInterest,
    paidPrincipal: monthlyPrincipal,
    debt: debt
  }
}

function forecastEquity(homeValue, debt) {
  return homeValue.map((homeValue, i) => homeValue - debt[i])
}

function forecastSellingFees(homeValue, commission) {
  return homeValue.map(homeValue => homeValue * commission)
}

function forecastBuyScenario(startingValue, appreciationRate, principal, interestRate, commission) {
  const homeValue = forecastHomeValue(startingValue, appreciationRate)
  const mortgagePayment = calculateMortgagePayment(principal, interestRate)
  const { debt, debtInterest, paidPrincipal } = forecastDebt(principal, interestRate, mortgagePayment)
  const equity = forecastEquity(homeValue, debt)
  const fees = forecastSellingFees(homeValue, commission)
  const netEquity = equity.map((value, i) => value - fees[i])
  return {
    homeValue,
    debt,
    equity,
    fees,
    netEquity
  }
}

function forecastBuyScenarioAnnual(startingValue, appreciationRate, principal, interestRate, commission) {
  const buyForecast = forecastBuyScenario(startingValue, appreciationRate, principal, interestRate, commission)
  for (const key in buyForecast) {
    buyForecast[key] = buyForecast[key].filter((value, i) => i % 12 === 0).map(num => parseInt(num, 10))
  }
  return buyForecast
}

// console.log(forecastBuyScenario(750000, 0.03, 600000, 0.06, 0.06))
console.log(forecastBuyScenarioAnnual(750000, 0.03, 600000, 0.06, 0.06))
