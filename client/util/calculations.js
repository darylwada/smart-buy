const calculations = {
  forecastHomeValue(purchasePrice, annualAppreciationRate) {
    const forecast = []
    for (let i = 0; i <= 360; i++) {
      forecast.push(purchasePrice * Math.pow(1 + annualAppreciationRate / 12, i))
    }
    return forecast
  },

  calculateMortgagePayment(principal, interestRate) {
    if (interestRate === 0) return principal / 360
    return principal * (interestRate / 12 * Math.pow(1 + interestRate / 12, 360)) / (Math.pow(1 + interestRate / 12, 360) - 1)
  },

  forecastDebt(principal, interestRate, mortgagePayment) {
    const debt = [principal]
    const paidPrincipal = [0]
    const paidInterest = [0]
    for (let i = 1; i <= 360; i++) {
      paidInterest.push(debt[i - 1] * interestRate / 12)
      paidPrincipal.push(mortgagePayment - paidInterest[i])
      i === 360 ? debt.push(0) : debt.push(debt[i - 1] - paidPrincipal[i])
    }
    return { debt, paidPrincipal, paidInterest }
  },

  forecastEquity(homeValue, debt) {
    return homeValue.map((homeValue, i) => homeValue - debt[i])
  },

  forecastSellingFees(homeValue, salesCommission) {
    return homeValue.map(homeValue => homeValue * salesCommission)
  },

  forecastPropertyTax(homeValue, propertyTaxRate) {
    return [0, ...homeValue
      .slice(0, homeValue.length - 1)
      .map(value => value * propertyTaxRate / 12)]
  },

  forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate) {
    const expenses = [0]
    for (let i = 1; i <= 360; i++) {
      expenses.push(propertyTax[i] + (hoa + maintenance + insurance) * Math.pow(1 + generalInflationRate / 12, i - 1))
    }
    return expenses
  },

  forecastDeductions(paidInterest, propertyTax, incomeTaxRate) {
    const deductions = []
    for (let i = 0; i <= 360; i++) {
      deductions.push((paidInterest[i] + propertyTax[i]) * incomeTaxRate)
    }
    return deductions
  },

  forecastCashFlow(deductions, mortgagePayment, expenses) {
    return deductions.map((value, i) => i === 0 ? 0 : mortgagePayment + expenses[i] - value)
  },

  forecastRent(rentBase, rentInflationRate) {
    const rent = [0]
    for (let i = 1; i <= 360; i++) {
      rent.push(rentBase * Math.pow(1 + rentInflationRate / 12, i))
    }
    return rent
  },

  forecastSavings(cashFlow, rent) {
    return rent.map((value, i) => cashFlow[i] - value)
  },

  forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings) {
    const initialCapital = (downPayment + closingCosts) * purchasePrice
    const investment = [initialCapital]
    for (let i = 1; i <= 360; i++) {
      investment.push(investment[i - 1] * (1 + rentReturn / 12) + savings[i])
    }
    return investment
  },

  forecastNetEquity(equity, fees) {
    return equity.map((value, i) => value - fees[i])
  },

  forecastAnnualEquity({ purchasePrice, hoa, maintenance, insurance, rentBase,
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
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { debt, paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const equity = calculations.forecastEquity(homeValue, debt)
    const fees = calculations.forecastSellingFees(homeValue, salesCommission)
    const netEquity = calculations.forecastNetEquity(equity, fees)
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
    const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
    const cashFlow = calculations.forecastCashFlow(deductions, mortgagePayment, expenses)
    const rent = calculations.forecastRent(rentBase, rentInflationRate)
    const savings = calculations.forecastSavings(cashFlow, rent)
    const investment = calculations.forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings)

    const dataTableFields = {
      homeValue,
      debt,
      equity,
      fees,
      netEquity,
      cashFlow,
      rent,
      investment
    }

    const annualizedFields = {}

    for (const metric in dataTableFields) {
      if (metric === 'cashFlow' || metric === 'rent') {
        annualizedFields[metric] = [0]
        for (let i = 1; i <= 360; i += 12) {
          annualizedFields[metric].push(Math.round(dataTableFields[metric]
            .slice(i, i + 12)
            .reduce((sum, val) => sum + val)))
        }
      }
      else {
        annualizedFields[metric] = dataTableFields[metric]
          .filter((value, i) => i % 12 === 0)
          .map(num => Math.round(num))
      }
    }
    annualizedFields.years = annualizedFields.homeValue.map((value, i) => i)
    return annualizedFields
  }
}

export default calculations
