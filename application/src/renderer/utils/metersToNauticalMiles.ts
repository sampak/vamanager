export const metersToNauticalMiles = (meters: number) => {
  const conversionFactor = 0.000539957;
  return meters * conversionFactor;
};
