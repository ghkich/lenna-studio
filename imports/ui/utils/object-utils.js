const omit = (keysToOmit, originalObj = {}) =>
  Object.fromEntries(Object.entries(originalObj).filter(([key]) => !keysToOmit.includes(key)))

const removeUndefined = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined))

export const ObjectUtils = {
  omit,
  removeUndefined,
}
