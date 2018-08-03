import calculations from './calculations'

describe('Home value', () => {
  it('Calculates the home value correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    expect(homeValue[0]).toBe(purchasePrice)
    expect(Math.round(homeValue[1])).toBe(501250)
    expect(Math.round(homeValue[homeValue.length - 1])).toBe(1228421)
  })
})

describe('Mortgage payment', () => {
  it('Calculates the monthly mortgage payment correctly.', () => {
    const principal = 400000
    let interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    expect(Math.round(mortgagePayment)).toBe(2027)
    interestRate = 0
    const zeroInterest = calculations.calculateMortgagePayment(principal, 0)
    expect(Math.round(zeroInterest)).toBe(1111)
  })
})

describe('Mortgage debt', () => {
  it('Calculates remaining debt correctly.', () => {
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { debt } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    expect(debt[0]).toBe(principal)
    expect(Math.round(debt[1])).toBe(399473)
    expect(debt[debt.length - 1]).toBe(0)
  })
  
  it('Calculates paid interest correctly.', () => {
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    expect(paidInterest[0]).toBe(0)
    expect(Math.round(paidInterest[1])).toBe(1500)
    expect(Math.round(paidInterest[paidInterest.length - 1])).toBe(8)
  })
  
  it('Calculates paid principal correctly.', () => {
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidPrincipal } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    expect(paidPrincipal[0]).toBe(0)
    expect(Math.round(paidPrincipal[1])).toBe(527)
    expect(Math.round(paidPrincipal[paidPrincipal.length - 1])).toBe(2019)
  })
})

describe('Home equity', () => {
  it('Calculates home equity correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { debt } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const equity = calculations.forecastEquity(homeValue, debt)
    expect(equity[0]).toBe(100000)
    expect(Math.round(equity[1])).toBe(101777)
    expect(Math.round(equity[equity.length - 1])).toBe(1228421)
  })
})

describe('Selling fees', () => {
  it('Calculates selling fees correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const salesCommission = 0.06
    const fees = calculations.forecastSellingFees(homeValue, salesCommission)
    expect(fees[0]).toBe(30000)
    expect(Math.round(fees[1])).toBe(30075)
    expect(Math.round(fees[fees.length - 1])).toBe(73705)
  })
})

describe('Net equity', () => {
  it('Calculates net equity owning a home correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { debt } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const equity = calculations.forecastEquity(homeValue, debt)
    const salesCommission = 0.06
    const fees = calculations.forecastSellingFees(homeValue, salesCommission)
    const netEquity = calculations.forecastNetEquity(equity, fees)
    expect(netEquity[0]).toBe(70000)
    expect(Math.round(netEquity[1])).toBe(71702)
    expect(Math.round(netEquity[netEquity.length - 1])).toBe(1154716)
  })
})

describe('Property tax', () => {
  it('Calculates property tax payments correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    expect(propertyTax[0]).toBe(0)
    expect(Math.round(propertyTax[1])).toBe(521)
    expect(Math.round(propertyTax[propertyTax.length - 1])).toBe(1276)
  })
})

describe('Home expenses', () => {
  it('Calculates home expenses correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const hoa = 400
    const maintenance = 100
    const insurance = 100
    const generalInflationRate = 0.02
    const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
    expect(expenses[0]).toBe(0)
    expect(Math.round(expenses[1])).toBe(1121)
    expect(Math.round(expenses[expenses.length - 1])).toBe(2367)
  })
})

describe('Tax deductions', () => {
  it('Calculates tax deductions correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const incomeTaxRate = 0.25
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
    expect(deductions[0]).toBe(0)
    expect(Math.round(deductions[1])).toBe(505)
    expect(Math.round(deductions[deductions.length - 1])).toBe(321)
  })
})

describe('Home ownership cash flow', () => {
  it('Calculates cash flow correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const incomeTaxRate = 0.25
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
    const generalInflationRate = 0.02
    const hoa = 400
    const maintenance = 100
    const insurance = 100
    const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
    const cashFlow = calculations.forecastCashFlow(deductions, mortgagePayment, expenses)
    expect(cashFlow[0]).toBe(0)
    expect(Math.round(cashFlow[1])).toBe(2642)
    expect(Math.round(cashFlow[cashFlow.length - 1])).toBe(4073)
  })
})

describe('Rent payments', () => {
  it('Calculates rent payments correctly.', () => {
    const rentBase = 2500
    const rentInflationRate = 0.02
    const rent = calculations.forecastRent(rentBase, rentInflationRate)
    expect(rent[0]).toBe(0)
    expect(Math.round(rent[1])).toBe(2504)
    expect(Math.round(rent[rent.length - 1])).toBe(4553)
  })
})

describe('Rent savings', () => {
  it('Calculates savings when renting correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const incomeTaxRate = 0.25
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
    const generalInflationRate = 0.02
    const hoa = 400
    const maintenance = 100
    const insurance = 100
    const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
    const cashFlow = calculations.forecastCashFlow(deductions, mortgagePayment, expenses)
    const rentBase = 2500
    const rentInflationRate = 0.02
    const rent = calculations.forecastRent(rentBase, rentInflationRate)
    const savings = calculations.forecastSavings(cashFlow, rent)
    expect(savings[0]).toBe(0)
    expect(Math.round(savings[1])).toBe(138)
    expect(Math.round(savings[savings.length - 1])).toBe(-480)
  })
})

describe('Rent investments', () => {
  it('Calculates investments when renting correctly.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.03
    const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    const propertyTaxRate = 0.0125
    const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
    const incomeTaxRate = 0.25
    const principal = 400000
    const interestRate = 0.045  
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { paidInterest } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
    const hoa = 400
    const maintenance = 100
    const insurance = 100
    const generalInflationRate = 0.02
    const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
    const cashFlow = calculations.forecastCashFlow(deductions, mortgagePayment, expenses)
    const rentBase = 2500
    const rentInflationRate = 0.02
    const rent = calculations.forecastRent(rentBase, rentInflationRate)
    const savings = calculations.forecastSavings(cashFlow, rent)
    const downPayment = 0.2
    const closingCosts = 0.03
    const rentReturn = 0.06
    const investment = calculations.forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings)
    expect(investment[0]).toBe(115000)
    expect(Math.round(investment[1])).toBe(115713)
    expect(Math.round(investment[investment.length - 1])).toBe(605750)
  })
})

describe('Data table values', () => {
    it('Returns the correct annualized data for metrics that are snapshots.', () => {
      const purchasePrice = 500000
      const hoa = 400
      const maintenance = 100
      const insurance = 100
      const rentBase = 2500
      const interestRate = 4.5
      const downPayment = 20
      const closingCosts = 3
      const salesCommission = 6
      const propertyTaxRate = 1.25
      const annualAppreciationRate = 3
      const incomeTaxRate = 25
      const generalInflationRate = 2
      const rentInflationRate = 2
      const rentReturn = 6
      const annualized = calculations.forecastAnnualEquity({ purchasePrice, hoa, maintenance, insurance, rentBase,
        interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
        incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn })
      expect(annualized.homeValue[0]).toBe(500000)
      expect(annualized.homeValue[1]).toBe(515208)
      expect(annualized.homeValue[30]).toBe(1228421)
    })
    
    it('Returns the correct annualized data for metrics that requires summing.', () => {
      const purchasePrice = 500000
      const hoa = 400
      const maintenance = 100
      const insurance = 100
      const rentBase = 2500
      const interestRate = 4.5
      const downPayment = 20
      const closingCosts = 3
      const salesCommission = 6
      const propertyTaxRate = 1.25
      const annualAppreciationRate = 3
      const incomeTaxRate = 25
      const generalInflationRate = 2
      const rentInflationRate = 2
      const rentReturn = 6
      const annualized = calculations.forecastAnnualEquity({ purchasePrice, hoa, maintenance, insurance, rentBase,
        interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
        incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn })
      expect(annualized.rent[0]).toBe(0)
      expect(annualized.rent[1]).toBe(30327)
      expect(annualized.rent[30]).toBe(54139)
    })
  })
  