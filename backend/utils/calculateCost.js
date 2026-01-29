export function calculateCost(distanceKm) {
  const baseFare = 3;
  const perKm = 1.5;
  return +(baseFare + distanceKm * perKm).toFixed(2);
}
