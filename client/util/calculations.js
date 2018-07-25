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
  const paidPrincipal = [0]
  const paidInterest = [0]
  for (let i = 1; i <= 360; i++) {
    paidInterest.push(debt[i - 1] * interestRate / 12)
    paidPrincipal.push(mortgagePayment - paidInterest[i])
    i === 360 ? debt.push(0) : debt.push(debt[i - 1] - paidPrincipal[i])
  }
  return { debt, paidPrincipal, paidInterest }
}

function forecastEquity(homeValue, debt) {
  return homeValue.map((homeValue, i) => homeValue - debt[i])
}

function forecastSellingFees(homeValue, salesCommission) {
  return homeValue.map(homeValue => homeValue * salesCommission)
}

function forecastPropertyTax(homeValue, propertyTaxRate) {
  return homeValue.map((value, i) => i === 0 ? 0 : value * propertyTaxRate / 12)
}

function forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate) {
  const expenses = [0]
  for (let i = 1; i <= 360; i++) {
    expenses.push((propertyTax[i] + hoa + maintenance + insurance) * Math.pow(1 + generalInflationRate / 12, i))
  }
  return expenses
}

function forecastDeductions(paidInterest, propertyTax, incomeTaxRate) {
  const deductions = []
  for (let i = 0; i <= 360; i++) {
    deductions.push((paidInterest[i] + propertyTax[i]) * incomeTaxRate)
  }
  return deductions
}

function forecastCashFlow(deductions, mortgagePayment, expenses) {
  return deductions.map((value, i) => i === 0 ? 0 : mortgagePayment + expenses[i] - value)
}

function forecastRent(rentBase, rentInflationRate) {
  const rent = [0]
  for (let i = 1; i <= 360; i++) {
    rent.push(rentBase * Math.pow(1 + rentInflationRate / 12, i))
  }
  return rent
}

function forecastSavings(cashFlow, rent) {
  return rent.map((value, i) => cashFlow[i] - value)
}

function forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings) {
  const initialCapital = (downPayment + closingCosts) * purchasePrice
  const investment = [initialCapital]
  for (let i = 1; i <= 360; i++) {
    investment.push(investment[i - 1] * (1 + rentReturn / 12) + savings[i])
  }
  return investment
}

function forecastMonthlyEquity(purchasePrice, hoa, maintenance, insurance, rentBase,
  interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
  incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn, principal) {

  const homeValue = forecastHomeValue(purchasePrice, annualAppreciationRate)
  const mortgagePayment = calculateMortgagePayment(principal, interestRate)
  const { debt, paidInterest } = forecastDebt(principal, interestRate, mortgagePayment)
  const equity = forecastEquity(homeValue, debt)
  const fees = forecastSellingFees(homeValue, salesCommission)
  const netEquity = equity.map((value, i) => value - fees[i])
  const propertyTax = forecastPropertyTax(homeValue, propertyTaxRate)
  const expenses = forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
  const deductions = forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
  const cashFlow = forecastCashFlow(deductions, mortgagePayment, expenses)
  const rent = forecastRent(rentBase, rentInflationRate)
  const savings = forecastSavings(cashFlow, rent)
  const investment = forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings)

  return {
    homeValue,
    debt,
    equity,
    fees,
    netEquity,
    cashFlow,
    rent,
    investment
  }
}

export default function forecastAnnualEquity({ purchasePrice, hoa, maintenance, insurance, rentBase,
  interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
  incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn }) {

  annualAppreciationRate /= 100
  downPayment /= 100
  interestRate /= 100
  salesCommission /= 100
  propertyTaxRate /= 100
  generalInflationRate /= 100
  rentInflationRate /= 100
  incomeTaxRate /= 100
  rentReturn /= 100
  closingCosts /= 100

  const principal = purchasePrice * (1 - downPayment)
  const monthlyForecast = forecastMonthlyEquity(purchasePrice, hoa, maintenance, insurance, rentBase,
    interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
    incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn, principal)
  const annualForecast = {}

  for (const metric in monthlyForecast) {
    if (metric === 'cashFlow' || metric === 'rent') {
      annualForecast[metric] = [0]
      for (let i = 1; i <= 360; i += 12) {
        annualForecast[metric].push(parseInt(monthlyForecast[metric]
            .slice(i, i + 12)
            .reduce((sum, val) => sum + val), 10))
      }
    }
    else {
      annualForecast[metric] = monthlyForecast[metric]
        .filter((value, i) => i % 12 === 0)
        .map(num => parseInt(num, 10))
    }
  }
  return annualForecast
}