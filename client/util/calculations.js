function forecastHomeValue(purchasePrice, annualAppreciation) {
  const forecast = []
  for (let i = 0; i <= 360; i++) {
    forecast.push(purchasePrice * Math.pow(1 + annualAppreciation / 12, i))
  }
  return forecast
}

function calculateMortgagePayment(principal, interestRate) {
  if (interestRate === 0) return principal / 360
  return principal * (interestRate / 12 * Math.pow(1 + interestRate / 12, 360)) / (Math.pow(1 + interestRate / 12, 360) - 1)
}

function forecastDebt(principal, interestRate, mortgagePayment) {
  const debt = [principal]
  const monthlyPrincipal = [0]
  const monthlyInterest = [0]
  for (let i = 1; i <= 360; i++) {
    monthlyInterest.push(debt[i - 1] * interestRate / 12)
    monthlyPrincipal.push(mortgagePayment - monthlyInterest[i])
    i === 360 ? debt.push(0) : debt.push(debt[i - 1] - monthlyPrincipal[i])
  }
  return debt
}

function forecastEquity(homeValue, debt) {
  return homeValue.map((homeValue, i) => homeValue - debt[i])
}

function forecastSellingFees(homeValue, salesCommission) {
  return homeValue.map(homeValue => homeValue * salesCommission)
}

function forecastMonthlyEquity(purchasePrice, annualAppreciation, principal, interestRate, salesCommission) {
  const homeValue = forecastHomeValue(purchasePrice, annualAppreciation)
  const mortgagePayment = calculateMortgagePayment(principal, interestRate)
  const debt = forecastDebt(principal, interestRate, mortgagePayment)
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

export function forecastAnnualEquity({ purchasePrice, annualAppreciation, downPayment, interestRate, salesCommission }) {
  annualAppreciation /= 100
  downPayment /= 100
  interestRate /= 100
  salesCommission /= 100
  const principal = purchasePrice * (1 - downPayment)
  const monthlyForecast = forecastMonthlyEquity(purchasePrice, annualAppreciation, principal, interestRate, salesCommission)
  const annualForecast = {}
  for (const metric in monthlyForecast) {
    annualForecast[metric] = monthlyForecast[metric].filter((value, i) => i % 12 === 0).map(num => parseInt(num, 10))
  }
  return annualForecast
}
