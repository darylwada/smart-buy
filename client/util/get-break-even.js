export default function getBreakEven(netEquity, investment) {
  for (let i = 0; i < netEquity.length; i++) {
    if (netEquity[i] >= investment[i]) return i
  }
  return -1
}