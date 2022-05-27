/**
 * @param {number} number: number
 * @param {number} n: length of decimal
 * @param {number} x: length of sections
 */
const formatNumber = (number = 0, n = 0, x = 3) => {
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;

  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$& ')
    .replace(/\.00$/, '');
};

export default formatNumber;

export const formatPrice = price =>
  formatNumber(price)
    .split(' ')
    .join('  '); // join with &#8202;
