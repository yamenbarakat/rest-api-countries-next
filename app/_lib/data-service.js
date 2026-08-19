import countriesData from "../_data/countries.json";

export async function getAllCountries() {
  return countriesData;
}

export async function getCountry(code) {
  if (!code) return null;
  const upperCode = code.toUpperCase();
  
  const country = countriesData.find(
    (c) =>
      c.cca3?.toUpperCase() === upperCode ||
      c.cca2?.toUpperCase() === upperCode ||
      c.ccn3 === code ||
      c.cioc?.toUpperCase() === upperCode,
  );

  return country ?? null;
}

export async function getCountriesByCodes(codes) {
  if (!codes || !Array.isArray(codes) || codes.length === 0) return [];

  const codeSet = new Set(codes.map((c) => c.toUpperCase()));
  return countriesData.filter(
    (c) =>
      (c.cca3 && codeSet.has(c.cca3.toUpperCase())) ||
      (c.cca2 && codeSet.has(c.cca2.toUpperCase())),
  );
}
