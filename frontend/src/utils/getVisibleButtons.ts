export interface VisibleButton {
  key: string;
  button: boolean;
}

export const getVisibleButtons = (buttons) => {
  if (!buttons) {
    return null;
  }

  const objectEntries = Object.entries(buttons);

  return objectEntries
    .filter(([, settings]) => settings === true)
    .map((b) => ({
      key: b[0] as string,
      button: b[1] as boolean,
    }));
};
