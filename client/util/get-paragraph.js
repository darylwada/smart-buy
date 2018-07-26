import React from 'react'
import getBreakEven from '../util/get-break-even'

const styles = {
  break: {
    lineHeight: '2.2em'
  }
}

export default function getParagraph(netEquity, investment, downPaymentAmt, closingCostsAmt, rentReturn, annualAppreciationRate) {
  const breakEven = getBreakEven(netEquity, investment)

  if (breakEven === -1) {
    return (
      <p>
        Buying will <strong>never</strong> be a better financial option than renting. <br style={styles.break} />
        The initial down payment of <strong>${downPaymentAmt}</strong> and closing costs of <strong>${closingCostsAmt}
        </strong> can be invested at a <strong>{rentReturn}%</strong> annual rate of return if you rented instead. Your savings will grow 
        at such a fast pace that your equity in the buying scenario will never be able to catch up to your rent savings.
      </p>
    )
  }

  if (breakEven === 0) {
    return (
      <p>
        Buying will <strong>always</strong> be a better financial option than renting. <br style={styles.break} />
        If you were to rent instead and invest the <strong>${downPaymentAmt}</strong> down payment at a <strong>{rentReturn}%
        </strong> annual rate of return, you would still have saved up less at any given time compared to owning a home.
        Lower monthly payments and a home appreciate rate of <strong>{annualAppreciationRate}%</strong> a year will maintain a positive
        equity gap versus your comparable renting scenario.
      </p>
    )
  }

  if (breakEven > 0) {
    return (
      <p>
        Buying becomes a better financial option than renting after <strong>{breakEven}</strong> years. If you sell before
        then, the fees from buying and selling would offset the financial benefits of owning a home over time. <br style={styles.break} />
        The initial down payment of <strong>${downPaymentAmt}</strong> and closing costs of <strong>${closingCostsAmt}
        </strong> can be invested at a <strong>{rentReturn}%</strong> annual rate of return if you rented instead, giving you
        more equity in the short term. <br style={styles.break} />
        Eventually your equity as a home owner will exceed your savings as a renter. This is due to your monthly mortgage payments 
        increasingly going toward principal rather than interest, and from tax deductions you can claim as a home owner.
      </p>
    )
  }
}