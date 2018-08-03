import calculations from './calculations'

const purchasePrice = 500000
let interestRate = 0.045
let downPayment = 0.2
let closingCosts = 0.03
let salesCommission = 0.06
let propertyTaxRate = 0.0125
const hoa = 400
const maintenance = 100
const insurance = 100
let annualAppreciationRate = 0.03
let incomeTaxRate = 0.25
let generalInflationRate = 0.02
const rentBase = 2500
let rentInflationRate = 0.02
let rentReturn = 0.06
const principal = 400000

const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
const { debt, paidInterest, paidPrincipal } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
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

describe('Home value', () => {
  it('Calculates the home value correctly.', () => {
    expect(homeValue[0]).toBe(purchasePrice)
    expect(Math.round(homeValue[1])).toBe(501250)
    expect(Math.round(homeValue[homeValue.length - 1])).toBe(1228421)
  })
})

describe('Mortgage payment', () => {
  it('Calculates the monthly mortgage payment correctly.', () => {
    expect(Math.round(mortgagePayment)).toBe(2027)
    expect(Math.round(calculations.calculateMortgagePayment(principal, 0))).toBe(1111)
  })
})

describe('Debt forecast', () => {
  it('Calculates remaining debt, paid principal, and paid interest correctly.', () => {
    expect(debt[0]).toBe(principal)
    expect(paidInterest[0]).toBe(0)
    expect(paidPrincipal[0]).toBe(0)
    expect(Math.round(debt[1])).toBe(399473)
    expect(Math.round(paidInterest[1])).toBe(1500)
    expect(Math.round(paidPrincipal[1])).toBe(527)
    expect(debt[debt.length - 1]).toBe(0)
    expect(Math.round(paidInterest[paidInterest.length - 1])).toBe(8)
    expect(Math.round(paidPrincipal[paidPrincipal.length - 1])).toBe(2019)
  })
})

describe('Equity forecast', () => {
  it('Calculates home equity correctly.', () => {
    expect(equity[0]).toBe(100000)
    expect(Math.round(equity[1])).toBe(101777)
    expect(Math.round(equity[equity.length - 1])).toBe(1228421)
  })
})

describe('Selling fees forecast', () => {
  it('Calculates selling fees correctly.', () => {
    expect(fees[0]).toBe(30000)
    expect(Math.round(fees[1])).toBe(30075)
    expect(Math.round(fees[fees.length - 1])).toBe(73705)
  })
})

describe('Property tax forecast', () => {
  it('Calculates property tax payments correctly.', () => {
    expect(propertyTax[0]).toBe(0)
    expect(Math.round(propertyTax[1])).toBe(521)
    expect(Math.round(propertyTax[propertyTax.length - 1])).toBe(1276)
  })
})

describe('Expenses forecast', () => {
  it('Calculates property tax payments correctly.', () => {
    expect(expenses[0]).toBe(0)
    expect(Math.round(expenses[1])).toBe(1121)
    expect(Math.round(expenses[expenses.length - 1])).toBe(2367)
  })
})

describe('Deductions forecast', () => {
  it('Calculates tax deductions correctly.', () => {
    expect(deductions[0]).toBe(0)
    expect(Math.round(deductions[1])).toBe(505)
    expect(Math.round(deductions[deductions.length - 1])).toBe(321)
  })
})

describe('Cash flow forecast', () => {
  it('Calculates cash flow correctly.', () => {
    expect(cashFlow[0]).toBe(0)
    expect(Math.round(cashFlow[1])).toBe(2642)
    expect(Math.round(cashFlow[cashFlow.length - 1])).toBe(4073)
  })
})

describe('Rent forecast', () => {
  it('Calculates rent payments correctly.', () => {
    expect(rent[0]).toBe(0)
    expect(Math.round(rent[1])).toBe(2504)
    expect(Math.round(rent[rent.length - 1])).toBe(4553)
  })
})

describe('Savings forecast', () => {
  it('Calculates savings when renting correctly.', () => {
    expect(savings[0]).toBe(0)
    expect(Math.round(savings[1])).toBe(138)
    expect(Math.round(savings[savings.length - 1])).toBe(-480)
  })
})

describe('Investment forecast', () => {
  it('Calculates investments when renting correctly.', () => {
    expect(investment[0]).toBe(115000)
    expect(Math.round(investment[1])).toBe(115713)
    expect(Math.round(investment[investment.length - 1])).toBe(605750)
  })
})

describe('Net equity forecast', () => {
  it('Calculates net equity owning a home correctly.', () => {
    expect(netEquity[0]).toBe(70000)
    expect(Math.round(netEquity[1])).toBe(71702)
    expect(Math.round(netEquity[netEquity.length - 1])).toBe(1154716)
  })
})

describe('Data table values', () => {
  annualAppreciationRate *= 100
  downPayment *= 100
  interestRate *= 100
  salesCommission *= 100
  propertyTaxRate *= 100
  generalInflationRate *= 100
  rentInflationRate *= 100
  incomeTaxRate *= 100
  rentReturn *= 100
  closingCosts *= 100
  const annualized = calculations.forecastAnnualEquity({ purchasePrice, hoa, maintenance, insurance, rentBase,
    interestRate, downPayment, closingCosts, salesCommission, propertyTaxRate, annualAppreciationRate, 
    incomeTaxRate, generalInflationRate, rentInflationRate, rentReturn })
  
  it('Returns the correct arrays.', () => {
    expect(annualized.homeValue[0]).toBe(500000)
    expect(annualized.homeValue[1]).toBe(515208)
    expect(annualized.homeValue[30]).toBe(1228421)
    expect(annualized.rent[0]).toBe(0)
    expect(annualized.rent[1]).toBe(30327)
    expect(annualized.rent[30]).toBe(54139)
  })
})
