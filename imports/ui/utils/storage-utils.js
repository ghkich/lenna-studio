export const getLocalItem = (item) => (localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item) || '{}') : '')
export const setLocalItem = (item, data) => localStorage.setItem(item, JSON.stringify(data))
export const removeLocalItem = (item) => localStorage.removeItem(item)
