import { setupMaster } from "cluster";

export default function getForecastData(state) {
  let { 
    purchasePrice,
    interestRate,
    downPayment,
    closingCosts,
    salesCommission,
    propertyTaxRate,
    hoa,
    maintenance,
    insurance,
    annualAppreciationRate,
    incomeTaxRate,
    generalInflationRate,
    rentBase,
    rentInflationRate,
    rentReturn
  } = state

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
  const dataByMonth = {}
  const dataByYear = {}

  const mortgagePayment = (() => {
    if (interestRate === 0) return principal / 360
    return principal * (interestRate / 12 * Math.pow(1 + interestRate / 12, 360)) / (Math.pow(1 + interestRate / 12, 360) - 1)
  })()

  !(function forecastHomeValue() {
    const forecast = []
    for (let i = 0; i <= 360; i++) {
      forecast.push(purchasePrice * Math.pow(1 + annualAppreciationRate / 12, i))
    }
    dataByMonth.homeValue = forecast
  })()

  !(function forecastDebt() {
    const debt = [principal]
    const paidPrincipal = [0]
    const paidInterest = [0]
    for (let i = 1; i <= 360; i++) {
      paidInterest.push(debt[i - 1] * interestRate / 12)
      paidPrincipal.push(mortgagePayment - paidInterest[i])
      i === 360 ? debt.push(0) : debt.push(debt[i - 1] - paidPrincipal[i])
    }
    Object.assign(dataByMonth, { paidPrincipal, paidInterest, debt })
  })()

  !(function forecastEquity() {
    dataByMonth.equity = dataByMonth.homeValue.map((value, i) => value - dataByMonth.debt[i])
  })()

  !(function forecastSellingFees() {
    dataByMonth.fees = dataByMonth.homeValue.map(value => value * salesCommission)
  })()

  !(function forecastNetEquity() {
    dataByMonth.netEquity = dataByMonth.equity.map((value, i) => value - dataByMonth.fees[i])
  })()

  !(function forecastPropertyTax() {
    dataByMonth.propertyTax = dataByMonth.homeValue.map((value, i) => {
      return i === 0 
        ? 0 
        : value * propertyTaxRate / 12
    })
  })()

  !(function forecastExpenses() {
    const { propertyTax } = dataByMonth
    const expenses = [0]
    for (let i = 1; i <= 360; i++) {
      expenses.push((propertyTax[i] + hoa + maintenance + insurance) * Math.pow(1 + generalInflationRate / 12, i))
    }
    dataByMonth.expenses = expenses
  })()

  !(function forecastDeductions() {
    const { paidInterest, propertyTax } = dataByMonth
    const deductions = []
    for (let i = 0; i <= 360; i++) {
      deductions.push((paidInterest[i] + propertyTax[i]) * incomeTaxRate)
    }
    dataByMonth.deductions = deductions
  })()

  !(function forecastCashFlow() {
    dataByMonth.cashFlow = dataByMonth.deductions.map((value, i) => {
      return i === 0
        ? 0
        : mortgagePayment + dataByMonth.expenses[i] - value
    })
  })()

  !(function forecastRent() {
    const rent = [0]
    for (let i = 1; i <= 360; i++) {
      rent.push(rentBase * Math.pow(1 + rentInflationRate / 12, i))
    }
    dataByMonth.rent = rent
  })()

  !(function forecastSavings() {
    dataByMonth.savings = dataByMonth.rent.map((value, i) => dataByMonth.cashFlow[i] - value)
  })()

  !(function forecastRentInvestment() {
    const initialCapital = (downPayment + closingCosts) * purchasePrice
    const investment = [initialCapital]
    for (let i = 1; i <= 360; i++) {
      investment.push(investment[i - 1] * (1 + rentReturn / 12) + dataByMonth.savings[i])
    }
    dataByMonth.investment = investment
  })()

  // !(function annualize() {
  //   for (const metric in dataByMonth) {
  //     dataByYear[metric] = dataByMonth[metric]
  //       .filter((value, i) => i % 12 === 0)
  //       .map(num => parseInt(num, 10))
  //   }
  // })()

  !(function annualize() {
    for (const metric in dataByMonth) {
      if (metric === 'cashFlow' || metric === 'rent') {
        dataByYear[metric] = [0]
        for (let i = 1; i <= 360; i += 12) {
          dataByYear[metric].push(
            parseInt(dataByMonth[metric]
              .slice(i, i + 12)
              .reduce((sum, val) => sum + val)
            , 10)
          )
        }
      }
      else {
      dataByYear[metric] = dataByMonth[metric]
        .filter((value, i) => i % 12 === 0)
        .map(num => parseInt(num, 10))
      }
    }
  })()

  console.log(dataByMonth)
  console.log(dataByYear)

  return dataByYear

}