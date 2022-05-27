export { formatPrice } from './formatNumber';
export { default as formatNumber } from './formatNumber';
export { default as getUniqueId } from './get-unique-id';

const isGoogleBot = navigator.userAgent.indexOf('Speed Insights') >= 0;
const isDevelopment = process.env.NODE_ENV !== 'production';
const isReactSnap = navigator.userAgent === 'ReactSnap';

export { isGoogleBot, isDevelopment, isReactSnap };
