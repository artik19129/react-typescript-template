let webpSupport = null;

export default function() {
  if (webpSupport !== null) {
    return webpSupport;
  }

  const elem =
    typeof document === 'object' ? document.createElement('canvas') : {};

  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    webpSupport = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return webpSupport;
  }
  // very old browser like IE 8, canvas not supported
  webpSupport = false;
  return false;
}
