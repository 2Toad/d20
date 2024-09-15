/**
 * These are public domain third-party implementations from github.com/bryc
 * I have modified them slightly so they will work with TypeScript.
 *
 * In in effort not to break the original functionality, I am not modifying
 * them in a way that will satisfy ESLint, so lint is disabled here.
 *
 */

/* eslint-disable */

/**
 * 32-bit MurmurHash3
 */
export const murmurHash3 = (key, seed = 0) => {
  let k,
    h = seed | 0;
  const p1 = 3432918353,
    p2 = 461845907;

  for (var i = 0, b = key.length & -4; i < b; i += 4) {
    k = (key[i + 3] << 24) | (key[i + 2] << 16) | (key[i + 1] << 8) | key[i];
    k = Math.imul(k, p1);
    k = (k << 15) | (k >>> 17);
    h ^= Math.imul(k, p2);
    h = (h << 13) | (h >>> 19);
    h = (Math.imul(h, 5) + 3864292196) | 0; // |0 = prevent float
  }

  k = 0;
  switch (key.length & 3) {
    case 3:
      k ^= key[i + 2] << 16;
      break;
    case 2:
      k ^= key[i + 1] << 8;
      break;
    case 1:
      k ^= key[i];
      k = Math.imul(k, p1);
      k = (k << 15) | (k >>> 17);
      h ^= Math.imul(k, p2);
      break;
  }

  h ^= key.length;

  h ^= h >>> 16;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  h = Math.imul(h, 3266489909);
  h ^= h >>> 16;

  return h >>> 0;
};

/**
 * 128-bit PRNG
 */
export const sfc32 = (a, b, c, d) => {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
};
