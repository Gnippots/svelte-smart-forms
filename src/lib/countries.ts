// Lightweight country data + phone helpers for PhoneInput.
//
// This is intentionally NOT libphonenumber. Validation here is "plausible", not
// authoritative: it checks the E.164 digit budget (max 15 digits total) and,
// for countries whose national significant number is a reliably fixed length,
// that the digit count matches. Countries with highly variable national lengths
// are left without a `lengths` rule and fall back to the generic range, so we
// avoid rejecting valid numbers at the cost of accepting some invalid ones.

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2, uppercase (e.g. 'AU'). */
  iso: string;
  name: string;
  /** Country calling code, digits only, no '+' (e.g. '61'). */
  dialCode: string;
  /**
   * Valid national significant number lengths (trunk prefix excluded).
   * Omit for countries with variable-length numbers — those get the generic range.
   */
  lengths?: number[];
}

/** Minimum plausible national significant number length. */
export const GENERIC_MIN_NATIONAL = 4;
/** E.164 caps the whole international number (country code + national) at 15 digits. */
export const E164_MAX_DIGITS = 15;

// A "common" cluster is listed first (better dropdown UX and makes shared dial
// codes such as +1 resolve to the more common country), then the rest roughly
// alphabetical. Extend or subset this via PhoneInput's `countries` prop.
export const phoneCountries: PhoneCountry[] = [
  { iso: 'AU', name: 'Australia', dialCode: '61', lengths: [9] },
  { iso: 'US', name: 'United States', dialCode: '1', lengths: [10] },
  { iso: 'GB', name: 'United Kingdom', dialCode: '44' },
  { iso: 'NZ', name: 'New Zealand', dialCode: '64' },
  { iso: 'CA', name: 'Canada', dialCode: '1', lengths: [10] },
  { iso: 'IE', name: 'Ireland', dialCode: '353' },
  { iso: 'IN', name: 'India', dialCode: '91', lengths: [10] },
  { iso: 'SG', name: 'Singapore', dialCode: '65', lengths: [8] },

  { iso: 'AR', name: 'Argentina', dialCode: '54' },
  { iso: 'AT', name: 'Austria', dialCode: '43' },
  { iso: 'BD', name: 'Bangladesh', dialCode: '880' },
  { iso: 'BE', name: 'Belgium', dialCode: '32' },
  { iso: 'BR', name: 'Brazil', dialCode: '55', lengths: [10, 11] },
  { iso: 'CL', name: 'Chile', dialCode: '56' },
  { iso: 'CN', name: 'China', dialCode: '86' },
  { iso: 'CO', name: 'Colombia', dialCode: '57' },
  { iso: 'CZ', name: 'Czechia', dialCode: '420' },
  { iso: 'DK', name: 'Denmark', dialCode: '45', lengths: [8] },
  { iso: 'EG', name: 'Egypt', dialCode: '20' },
  { iso: 'FI', name: 'Finland', dialCode: '358' },
  { iso: 'FR', name: 'France', dialCode: '33', lengths: [9] },
  { iso: 'DE', name: 'Germany', dialCode: '49' },
  { iso: 'GR', name: 'Greece', dialCode: '30', lengths: [10] },
  { iso: 'HK', name: 'Hong Kong', dialCode: '852', lengths: [8] },
  { iso: 'HU', name: 'Hungary', dialCode: '36' },
  { iso: 'ID', name: 'Indonesia', dialCode: '62' },
  { iso: 'IL', name: 'Israel', dialCode: '972' },
  { iso: 'IT', name: 'Italy', dialCode: '39' },
  { iso: 'JP', name: 'Japan', dialCode: '81' },
  { iso: 'KE', name: 'Kenya', dialCode: '254' },
  { iso: 'KR', name: 'South Korea', dialCode: '82' },
  { iso: 'MY', name: 'Malaysia', dialCode: '60' },
  { iso: 'MX', name: 'Mexico', dialCode: '52', lengths: [10] },
  { iso: 'NL', name: 'Netherlands', dialCode: '31', lengths: [9] },
  { iso: 'NG', name: 'Nigeria', dialCode: '234' },
  { iso: 'NO', name: 'Norway', dialCode: '47', lengths: [8] },
  { iso: 'PK', name: 'Pakistan', dialCode: '92' },
  { iso: 'PH', name: 'Philippines', dialCode: '63' },
  { iso: 'PL', name: 'Poland', dialCode: '48', lengths: [9] },
  { iso: 'PT', name: 'Portugal', dialCode: '351', lengths: [9] },
  { iso: 'RO', name: 'Romania', dialCode: '40', lengths: [9] },
  { iso: 'RU', name: 'Russia', dialCode: '7', lengths: [10] },
  { iso: 'SA', name: 'Saudi Arabia', dialCode: '966', lengths: [9] },
  { iso: 'ZA', name: 'South Africa', dialCode: '27', lengths: [9] },
  { iso: 'ES', name: 'Spain', dialCode: '34', lengths: [9] },
  { iso: 'SE', name: 'Sweden', dialCode: '46' },
  { iso: 'CH', name: 'Switzerland', dialCode: '41', lengths: [9] },
  { iso: 'TH', name: 'Thailand', dialCode: '66' },
  { iso: 'TR', name: 'Turkey', dialCode: '90', lengths: [10] },
  { iso: 'AE', name: 'United Arab Emirates', dialCode: '971' },
  { iso: 'UA', name: 'Ukraine', dialCode: '380', lengths: [9] },
  { iso: 'VN', name: 'Vietnam', dialCode: '84' }
];

/** Strip everything except digits. */
export function digitsOnly(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\D/g, '') : '';
}

/**
 * Drop leading trunk/national-access zeros. E.164 national significant numbers
 * never carry them, but users habitually type them (e.g. AU "0412...").
 */
export function stripTrunkPrefix(nationalDigits: string): string {
  return nationalDigits.replace(/^0+/, '');
}

/** Emoji flag from an ISO alpha-2 code via regional indicator symbols. */
export function flagEmoji(iso: string): string {
  if (typeof iso !== 'string' || iso.length !== 2) {
    return '';
  }

  const upper = iso.toUpperCase();
  if (!/^[A-Z]{2}$/.test(upper)) {
    return '';
  }

  return String.fromCodePoint(
    ...[...upper].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
  );
}

export function findCountryByIso(iso: unknown): PhoneCountry | undefined {
  if (typeof iso !== 'string') {
    return undefined;
  }

  const upper = iso.toUpperCase();
  return phoneCountries.find((country) => country.iso === upper);
}

/**
 * Parse an E.164 string ("+61412345678") into a country + national number.
 * Matches the longest dial-code prefix; ties resolve to the earlier-listed
 * country (see ordering note above). Returns null for non-E.164 input.
 */
export function parseE164(value: unknown): { country: string; nationalNumber: string } | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed.startsWith('+')) {
    return null;
  }

  const digits = digitsOnly(trimmed);
  if (!digits) {
    return null;
  }

  const match = phoneCountries
    .filter((country) => digits.startsWith(country.dialCode))
    .sort((a, b) => b.dialCode.length - a.dialCode.length)[0];

  if (!match) {
    return null;
  }

  return {
    country: match.iso,
    nationalNumber: digits.slice(match.dialCode.length)
  };
}

/** Build an E.164 string from a country and (possibly trunk-prefixed) national digits. */
export function composeE164(iso: string, nationalInput: string): string {
  const country = findCountryByIso(iso);
  const national = stripTrunkPrefix(digitsOnly(nationalInput));

  if (!country || !national) {
    return '';
  }

  return `+${country.dialCode}${national}`;
}

/**
 * Plausibility check for a national significant number (trunk prefix already stripped).
 * Enforces the E.164 digit budget and any fixed-length rule for the country.
 */
export function isValidNationalNumber(
  country: PhoneCountry | undefined,
  nationalDigits: string
): boolean {
  const length = nationalDigits.length;
  const dialLength = country ? country.dialCode.length : 0;
  const maxNational = E164_MAX_DIGITS - dialLength;

  if (length < GENERIC_MIN_NATIONAL || length > maxNational) {
    return false;
  }

  if (country?.lengths && country.lengths.length > 0) {
    return country.lengths.includes(length);
  }

  return true;
}