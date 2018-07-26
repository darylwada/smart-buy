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
        </strong> can be invested at a <strong>{rentReturn}%</strong> rate of return if you rented instead. If your monthly
        rent is lower than your housing payments, you can invest those savings as well. In addition, any selling fees will reduce
        your equity as a home owner.
      </p>
    )
  }

  if (breakEven === 0) {
    return (
      <p>
        Buying will <strong>always</strong> be a better financial option than renting. <br style={styles.break} />
        With no buying and selling fees, you would have no initial savings with which to invest if you were to rent instead.
        Meanwhile your home will appreciate in value by <strong>{annualAppreciationRate}%</strong> a year, maintaining a positive
        equity gap versus a renting scenario.
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