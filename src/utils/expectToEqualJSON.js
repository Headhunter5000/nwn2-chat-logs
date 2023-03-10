export const expectToEqualJSON = (actual, expected) => {
  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

export const expectNotToEqualJSON = (actual, expected) => {
  expect(JSON.stringify(actual)).not.toBe(JSON.stringify(expected));
};
