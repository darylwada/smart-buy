import calculations from './calculations'

xdescribe('Home value', () => {
  it('Returns forecasted home value give a purchase price and an appreciation rate.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0.02
    const result = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    expect(result[0]).toBe(purchasePrice)
    expect(Math.round(result[1])).toBe(500833)
    expect(Math.round(result[length - 1])).toBe(910604)
  })
  it('Returns the purchase price if the appreciation rate is zero.', () => {
    const purchasePrice = 500000
    const annualAppreciationRate = 0
    const result = calculations.forecastHomeValue(purchasePrice, annualAppreciationRate)
    expect(result[0]).toBe(purchasePrice)
    expect(result[1]).toBe(purchasePrice)
    expect(result[length - 1]).toBe(purchasePrice)
  })
})

xdescribe('Mortgage payment', () => {
  it('Return the correct value for a mortgage payment given a principal and interest rate', () => {
    const principal = 300000
    const interestRate = 0.0425
    const result = calculations.calculateMortgagePayment(principal, interestRate)
    expect(Math.round(result)).toBe(1476)
  })
})

describe('Debt forecast', () => {
  it('Returns the correct values for remaining debt, paid principal, and paid interest.', () => {
    const principal = 300000
    const interestRate = 0.0425
    const mortgagePayment = calculations.calculateMortgagePayment(principal, interestRate)
    const { debt, paidInterest, paidPrincipal } = calculations.forecastDebt(principal, interestRate, mortgagePayment)
    expect(debt[0]).toBe(principal)
    expect(paidInterest[0]).toBe(0)
    expect(paidPrincipal[0]).toBe(0)
    expect(Math.round(debt[1])).toBe(299587)
    expect(Math.round(paidInterest[1])).toBe(1063)
    expect(Math.round(paidPrincipal[1])).toBe(413)
    expect(Math.round(debt[debt.length - 1])).toBe(0)
    expect(Math.round(paidInterest[paidInterest.length - 1])).toBe(5)
    expect(Math.round(paidPrincipal[paidPrincipal.length - 1])).toBe(1471)
  })
})
