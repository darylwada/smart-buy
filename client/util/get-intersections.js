export default function getIntersections(netEquity, investment) {
  const intersect = []
  for (let i = 0; i < netEquity.length; i++) {
    if (!intersect.length && netEquity[i] >= investment[i]) {
      intersect.push(i)
    }
    if (intersect.length && investment[i] >= netEquity[i]) {
      intersect.push(i)
    }
  }
  return intersect
}