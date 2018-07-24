function forecastHomeValue(purchasePrice, annualAppreciation) {
  const forecast = []
  for (let i = 0; i <= 360; i++) {
    forecast.push(purchasePrice * Math.pow(1 + annualAppreciation / 12, i))
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

function forecastSellingFees(homeValue, salesCommission) {
  return homeValue.map(homeValue => homeValue * salesCommission)
}

function forecastBuyScenario(purchasePrice, annualAppreciation, principal, interestRate, salesCommission) {
  const homeValue = forecastHomeValue(purchasePrice, annualAppreciation)
  const mortgagePayment = calculateMortgagePayment(principal, interestRate)
  const { debt } = forecastDebt(principal, interestRate, mortgagePayment)
  const equity = forecastEquity(homeValue, debt)
  const fees = forecastSellingFees(homeValue, salesCommission)
  const netEquity = equity.map((value, i) => value - fees[i])
  return {
    homeValue,
    debt,
    equity,
    fees,
    netEquity
  }
}

export function forecastBuyScenarioAnnual({ purchasePrice, annualAppreciation, downPayment, interestRate, salesCommission }) {
  console.log(arguments)
  const principal = purchasePrice * (1 - downPayment)
  const buyForecast = forecastBuyScenario(purchasePrice, annualAppreciation, principal, interestRate, salesCommission)
  for (const key in buyForecast) {
    buyForecast[key] = buyForecast[key].filter((value, i) => i % 12 === 0).map(num => parseInt(num, 10))
  }
  return buyForecast
}
