import calculations from './calculations'

const purchasePrice = 500000
const interestRate = 0.045
const downPayment = 0.2
const closingCosts = 0.03
const salesCommission = 0.06
const propertyTaxRate = 0.0125
const hoa = 400
const maintenance = 100
const insurance = 100
const annualAppreciationRate = 0.03
const incomeTaxRate = 0.25
const generalInflationRate = 0.02
const rentBase = 2500
const rentInflationRate = 0.02
const rentReturn = 0.06
const principal = 400000

const homeValue = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
const { debt, paidInterest, paidPrincipal } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
const equity = calculations.forecastEquity(homeValue, debt)
const fees = calculations.forecastSellingFees(homeValue, salesCommission)
const netEquity = equity.map((value, i) => value - fees[i])
const propertyTax = calculations.forecastPropertyTax(homeValue, propertyTaxRate)
const expenses = calculations.forecastExpenses(propertyTax, hoa, maintenance, insurance, generalInflationRate)
const deductions = calculations.forecastDeductions(paidInterest, propertyTax, incomeTaxRate)
const cashFlow = calculations.forecastCashFlow(deductions, mortgagePayment, expenses)
const rent = calculations.forecastRent(rentBase, rentInflationRate)
const savings = calculations.forecastSavings(cashFlow, rent)
const investment = calculations.forecastRentInvestment(downPayment, closingCosts, purchasePrice, rentReturn, savings)

xdescribe('Home value', () => {
  it('Calculates the home value correctly.', () => {
    expect(homeValue[0]).toBe(purchasePrice)
    expect(Math.round(homeValue[1])).toBe(501250)
    expect(Math.round(homeValue[homeValue.length - 1])).toBe(1228421)
  })
})

xdescribe('Mortgage payment', () => {
  it('Calculates the monthly mortgage payment correctly.', () => {
    expect(Math.round(mortgagePayment)).toBe(2027)
  })
})

xdescribe('Debt forecast', () => {
  it('Calculates remaining debt, paid principal, and paid interest correctly.', () => {
    expect(debt[0]).toBe(principal)
    expect(paidInterest[0]).toBe(0)
    expect(paidPrincipal[0]).toBe(0)
    expect(Math.round(debt[1])).toBe(399473)
    expect(Math.round(paidInterest[1])).toBe(1500)
    expect(Math.round(paidPrincipal[1])).toBe(527)
    expect(Math.round(debt[debt.length - 1])).toBe(0)
    expect(Math.round(paidInterest[paidInterest.length - 1])).toBe(8)
    expect(Math.round(paidPrincipal[paidPrincipal.length - 1])).toBe(2019)
  })
})

xdescribe('Equity forecast', () => {
  it('Calculates home equity correctly.', () => {
    expect(Math.round(equity[0])).toBe(100000)
    expect(Math.round(equity[1])).toBe(101777)
    expect(Math.round(equity[equity.length - 1])).toBe(1154715)
  })
})

xdescribe('Selling fees forecast', () => {
  it('Calculates selling fees correctly.', () => {
    expect(Math.round(fees[0])).toBe(30000)
    expect(Math.round(fees[1])).toBe(30075)
    expect(Math.round(fees[fees.length - 1])).toBe(73705)
  })
})

xdescribe('Property tax forecast', () => {
  it('Calculates property tax payments correctly.', () => {
    expect(Math.round(propertyTax[0])).toBe(0)
    expect(Math.round(propertyTax[1])).toBe(521)
    expect(Math.round(propertyTax[propertyTax.length - 1])).toBe(1276)
  })
})

xdescribe('Expenses forecast', () => {
  it('Calculates property tax payments correctly.', () => {
    expect(Math.round(expenses[0])).toBe(0)
    expect(Math.round(expenses[1])).toBe(1121)
    expect(Math.round(expenses[expenses.length - 1])).toBe(2367)
  })
})

xdescribe('Deductions forecast', () => {
  it('Calculates tax deductions correctly.', () => {
    expect(Math.round(deductions[0])).toBe(0)
    expect(Math.round(deductions[1])).toBe(505)
    expect(Math.round(deductions[deductions.length - 1])).toBe(321)
  })
})

xdescribe('Cash flow forecast', () => {
  it('Calculates cash flow correctly.', () => {
    expect(Math.round(cashFlow[0])).toBe(0)
    expect(Math.round(cashFlow[1])).toBe(2642)
    expect(Math.round(cashFlow[cashFlow.length - 1])).toBe(4073)
  })
})

describe('Rent forecast', () => {
  it('Calculates rent payments correctly.', () => {
    expect(Math.round(rent[0])).toBe(0)
    expect(Math.round(rent[1])).toBe(2504)
    expect(Math.round(rent[rent.length - 1])).toBe(4553)
  })
})