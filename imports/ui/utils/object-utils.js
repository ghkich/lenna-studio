export const omit = (keysToOmit, originalObj = {}) =>
  Object.fromEntries(Object.entries(originalObj).filter(([key]) => !keysToOmit.includes(key)))
