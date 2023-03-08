const aliases = {
  B738: ['738', '737-800'],
  A320: ['320'],
};

export const findTypeFromAlias = (type: string) => {
  const objects = Object.entries(aliases);
  const element = objects.find((object) =>
    object[1].find((alias) => type.search(alias) !== -1)
  );

  return element ? element[0] : null;
};
