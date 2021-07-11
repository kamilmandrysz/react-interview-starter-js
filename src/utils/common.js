/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
export const isNotEmptyObject = (obj) =>
  obj && Object.entries(obj).length && obj.constructor === Object;
