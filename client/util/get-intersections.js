export default function getIntersections(netEquity, investment) {
  const intersections = []
  for (let i = 0; i < netEquity.length; i++) {
    if (!intersections.length && netEquity[i] >= investment[i]) {
      intersections.push(i)
    }
    if (intersections.length && investment[i] >= netEquity[i]) {
      intersections.push(i)
    }
  }
  return intersections
}