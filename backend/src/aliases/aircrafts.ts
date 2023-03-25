const aliases = {
  B738: ['738', '737-800'],
  A320: ['320'],
  A20N: ['20N'],
  A319: ['319'],
  A318: ['318'],
  A21N: ['21N'],
  P06T: ['P06T'],
  B737: ['737-700'],
  B739: ['739'],
  B736: ['736'],
  B777: ['777'],
  B787: ['787'],
};

export const findTypeFromAlias = (type: string) => {
  const objects = Object.entries(aliases);
  const element = objects.find((object) =>
    object[1].find((alias) => type.search(alias) !== -1)
  );

  return element ? element[0] : null;
};
