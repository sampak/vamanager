export const checkAircraftType = (alias: string, type: string) => {
  if (alias !== type) {
    return false;
  }

  return true;
};
