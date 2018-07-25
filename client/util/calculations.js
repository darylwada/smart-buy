export default function getForecastData(state) {
  const { purchasePrice, hoa, maintenance, insurance, rentBase } = state
  let { interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
    incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn } = state

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
  const data = {}
  const dataAnnual = {}

  const mortgagePayment = (() => {
    if (interestRate === 0) return principal / 360
    return principal * (interestRate / 12 * Math.pow(1 + interestRate / 12, 360)) / (Math.pow(1 + interestRate / 12, 360) - 1)
  })()

  !(function forecastHomeValue() {
    data.homeValue = []
    for (let i = 0; i <= 360; i++) {
      data.homeValue.push(purchasePrice * Math.pow(1 + annualAppreciationRate / 12, i))
    }
  })()

  !(function forecastDebt() {
    data.debt = [principal]
    data.paidPrincipal = [0]
    data.paidInterest = [0]
    for (let i = 1; i <= 360; i++) {
      data.paidInterest.push(data.debt[i - 1] * interestRate / 12)
      data.paidPrincipal.push(mortgagePayment - data.paidInterest[i])
      i === 360 
        ? data.debt.push(0) 
        : data.debt.push(data.debt[i - 1] - data.paidPrincipal[i])
    }
  })()

  !(function forecastEquity() {
    data.equity = data.homeValue.map((value, i) => value - data.debt[i])
  })()

  !(function forecastSellingFees() {
    data.fees = data.homeValue.map(value => value * salesCommission)
  })()

  !(function forecastNetEquity() {
    data.netEquity = data.equity.map((value, i) => value - data.fees[i])
  })()

  !(function forecastPropertyTax() {
    data.propertyTax = data.homeValue.map((value, i) => {
      return i === 0 
        ? 0 
        : value * propertyTaxRate / 12
    })
  })()

  !(function forecastExpenses() {
    data.expenses = [0]
    for (let i = 1; i <= 360; i++) {
      data.expenses.push((data.propertyTax[i] + hoa + maintenance + insurance) * Math.pow(1 + generalInflationRate / 12, i))
    }
  })()

  !(function forecastDeductions() {
    data.deductions = []
    for (let i = 0; i <= 360; i++) {
      data.deductions.push((data.paidInterest[i] + data.propertyTax[i]) * incomeTaxRate)
    }
  })()

  !(function forecastCashFlow() {
    data.cashFlow = data.deductions.map((value, i) => {
      return i === 0
        ? 0
        : mortgagePayment + data.expenses[i] - value
    })
  })()

  !(function forecastRent() {
    data.rent = [0]
    for (let i = 1; i <= 360; i++) {
      data.rent.push(rentBase * Math.pow(1 + rentInflationRate / 12, i))
    }
  })()

  !(function forecastSavings() {
    data.savings = data.rent.map((value, i) => data.cashFlow[i] - value)
  })()

  !(function forecastRentInvestment() {
    const initialCapital = (downPayment + closingCosts) * purchasePrice
    data.investment = [initialCapital]
    for (let i = 1; i <= 360; i++) {
      data.investment.push(data.investment[i - 1] * (1 + rentReturn / 12) + data.savings[i])
    }
  })()

  !(function annualize() {
    for (const metric in data) {
      if (metric === 'cashFlow' || metric === 'rent') {
        dataAnnual[metric] = [0]
        for (let i = 1; i <= 360; i += 12) {
          dataAnnual[metric].push(parseInt(data[metric]
              .slice(i, i + 12)
              .reduce((sum, val) => sum + val), 10))
        }
      }
      else {
        dataAnnual[metric] = data[metric]
          .filter((value, i) => i % 12 === 0)
          .map(num => parseInt(num, 10))
      }
    }
  })()

  return dataAnnual
}