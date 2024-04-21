export const stateAbbreviationsMapping: { [key: string]: string } = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    'District of Columbia': 'DC',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    Illinois: 'IL',
    Indiana: 'IN',
    Iowa: 'IA',
    Kansas: 'KS',
    Kentucky: 'KY',
    Louisiana: 'LA',
    Maine: 'ME',
    Maryland: 'MD',
    Massachusetts: 'MA',
    Michigan: 'MI',
    Minnesota: 'MN',
    Mississippi: 'MS',
    Missouri: 'MO',
    Montana: 'MT',
    Nebraska: 'NE',
    Nevada: 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    Ohio: 'OH',
    Oklahoma: 'OK',
    Oregon: 'OR',
    Pennsylvania: 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    Tennessee: 'TN',
    Texas: 'TX',
    Utah: 'UT',
    Vermont: 'VT',
    Virginia: 'VA',
    Washington: 'WA',
    'West Virginia': 'WV',
    Wisconsin: 'WI',
    Wyoming: 'WY',
};

export const states: string[] = Object.keys(stateAbbreviationsMapping);
export const stateAbbrevs: string[] = Object.values(stateAbbreviationsMapping);

export const abbrevToState: { [key: string]: string } = {};

for (const [state, abbrev] of Object.entries(stateAbbreviationsMapping)) {
    abbrevToState[abbrev] = state;
}

export const stateCenters: { [key: string]: { lat: number; lon: number } } = {
    Alabama: {
        lat: 32.7794,
        lon: -86.8287,
    },
    Alaska: {
        lat: 64.0685,
        lon: -152.2782,
    },
    Arizona: {
        lat: 34.2744,
        lon: -111.6602,
    },
    Arkansas: {
        lat: 34.8938,
        lon: -92.4426,
    },
    California: {
        lat: 37.1841,
        lon: -119.4696,
    },
    Colorado: {
        lat: 38.9972,
        lon: -105.5478,
    },
    Connecticut: {
        lat: 41.6219,
        lon: -72.7273,
    },
    Delaware: {
        lat: 38.9896,
        lon: -75.505,
    },
    'Washington DC': {
        lat: 38.9101,
        lon: -77.0147,
    },
    Florida: {
        lat: 28.6305,
        lon: -82.4497,
    },
    Georgia: {
        lat: 32.6415,
        lon: -83.4426,
    },
    Hawaii: {
        lat: 20.2927,
        lon: -156.3737,
    },
    Idaho: {
        lat: 44.3509,
        lon: -114.613,
    },
    Illinois: {
        lat: 40.0417,
        lon: -89.1965,
    },
    Indiana: {
        lat: 39.8942,
        lon: -86.2816,
    },
    Iowa: {
        lat: 42.0751,
        lon: -93.496,
    },
    Kansas: {
        lat: 38.4937,
        lon: -98.3804,
    },
    Kentucky: {
        lat: 37.5347,
        lon: -85.3021,
    },
    Louisiana: {
        lat: 31.0689,
        lon: -91.9968,
    },
    Maine: {
        lat: 45.3695,
        lon: -69.2428,
    },
    Maryland: {
        lat: 39.055,
        lon: -76.7909,
    },
    Massachusetts: {
        lat: 42.2596,
        lon: -71.8083,
    },
    Michigan: {
        lat: 44.3467,
        lon: -85.4102,
    },
    Minnesota: {
        lat: 46.2807,
        lon: -94.3053,
    },
    Mississippi: {
        lat: 32.7364,
        lon: -89.6678,
    },
    Missouri: {
        lat: 38.3566,
        lon: -92.458,
    },
    Montana: {
        lat: 47.0527,
        lon: -109.6333,
    },
    Nebraska: {
        lat: 41.5378,
        lon: -99.7951,
    },
    Nevada: {
        lat: 39.3289,
        lon: -116.6312,
    },
    'New Hampshire': {
        lat: 43.6805,
        lon: -71.5811,
    },
    'New Jersey': {
        lat: 40.1907,
        lon: -74.6728,
    },
    'New Mexico': {
        lat: 34.4071,
        lon: -106.1126,
    },
    'New York': {
        lat: 42.9538,
        lon: -75.5268,
    },
    'North Carolina': {
        lat: 35.5557,
        lon: -79.3877,
    },
    'North Dakota': {
        lat: 47.4501,
        lon: -100.4659,
    },
    Ohio: {
        lat: 40.2862,
        lon: -82.7937,
    },
    Oklahoma: {
        lat: 35.5889,
        lon: -97.4943,
    },
    Oregon: {
        lat: 43.9336,
        lon: -120.5583,
    },
    Pennsylvania: {
        lat: 40.8781,
        lon: -77.7996,
    },
    'Rhode Island': {
        lat: 41.6762,
        lon: -71.5562,
    },
    'South Carolina': {
        lat: 33.9169,
        lon: -80.8964,
    },
    'South Dakota': {
        lat: 44.4443,
        lon: -100.2263,
    },
    Tennessee: {
        lat: 35.858,
        lon: -86.3505,
    },
    Texas: {
        lat: 31.4757,
        lon: -99.3312,
    },
    Utah: {
        lat: 39.3055,
        lon: -111.6703,
    },
    Vermont: {
        lat: 44.0687,
        lon: -72.6658,
    },
    Virginia: {
        lat: 37.5215,
        lon: -78.8537,
    },
    Washington: {
        lat: 47.3826,
        lon: -120.4472,
    },
    'West Virginia': {
        lat: 38.6409,
        lon: -80.6227,
    },
    Wisconsin: {
        lat: 44.6243,
        lon: -89.9941,
    },
    Wyoming: {
        lat: 42.9957,
        lon: -107.5512,
    },
};


export function hslToHex(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }