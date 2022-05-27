export const matchOrigin = origin =>
  /^https?:\/\/([a-z0-9-]+\.)?socgress\.(com|net|org|ua|ru|info)(:[0-9]+)?$/.test(
    origin,
  );
