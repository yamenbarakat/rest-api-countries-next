const API_BASE_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = process.env.REST_COUNTRIES_API_KEY;
const PAGE_LIMIT = 100;

const LIST_FIELDS = [
  "names",
  "codes.alpha_3",
  "capitals.name",
  "flag",
  "population",
  "region",
].join(",");

const DETAIL_FIELDS = [
  LIST_FIELDS,
  "subregion",
  "currencies",
  "languages",
  "borders",
].join(",");

async function fetchCountries(path = "", searchParams = {}) {
  if (!API_KEY) {
    throw new Error("Missing REST_COUNTRIES_API_KEY environment variable");
  }

  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 86400 },
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.errors?.[0]?.message ??
      `REST Countries request failed: ${res.status}`;
    throw new Error(message);
  }

  return data?.data ?? {};
}

function normalizeLanguages(languages = []) {
  return Object.fromEntries(
    languages
      .map((language) => [
        language.iso639_3 ??
          language.iso639_2t ??
          language.iso639_2b ??
          language.iso639_1 ??
          language.bcp47 ??
          language.name,
        language.name,
      ])
      .filter(([key, value]) => key && value),
  );
}

function normalizeCurrencies(currencies = []) {
  return Object.fromEntries(
    currencies
      .map((currency) => [
        currency.code,
        { name: currency.name, symbol: currency.symbol },
      ])
      .filter(([key]) => key),
  );
}

function normalizeCountry(country) {
  if (!country) return null;

  return {
    name: {
      common: country.names?.common ?? "Unknown Country",
      official: country.names?.official ?? country.names?.common ?? "",
      nativeName: country.names?.native ?? {},
    },
    cca3: country.codes?.alpha_3,
    capital: country.capitals?.map((capital) => capital.name).filter(Boolean),
    flags: {
      png: country.flag?.url_png,
      svg: country.flag?.url_svg,
      alt: country.flag?.description,
    },
    population: country.population ?? 0,
    region: country.region ?? "N/A",
    subregion: country.subregion ?? "N/A",
    currencies: normalizeCurrencies(country.currencies),
    languages: normalizeLanguages(country.languages),
    borders: country.borders ?? [],
  };
}

export async function getAllCountries() {
  try {
    const countries = [];
    let offset = 0;
    let more = true;

    while (more) {
      const data = await fetchCountries("", {
        limit: PAGE_LIMIT,
        offset,
        response_fields: LIST_FIELDS,
      });

      countries.push(
        ...(data.objects ?? [])
          .map(normalizeCountry)
          .filter((country) => country?.cca3),
      );

      more = data.meta?.more ?? false;
      offset += PAGE_LIMIT;
    }

    return countries.filter(Boolean);
  } catch (err) {
    console.error("Network error during initial country fetch:", err);
    return [];
  }
}

export async function getCountry(code) {
  try {
    const data = await fetchCountries(`/codes.alpha_3/${code}`, {
      response_fields: DETAIL_FIELDS,
    });

    return normalizeCountry(data.objects?.[0]);
  } catch (err) {
    console.error(`Network error while fetching country (${code}):`, err);
    return null;
  }
}

export async function getCountriesByCodes(codes) {
  if (!codes || !Array.isArray(codes) || codes.length === 0) return [];

  try {
    const countries = await Promise.all(codes.map((code) => getCountry(code)));
    return countries.filter(Boolean);
  } catch (err) {
    console.error("Network error while fetching countries by codes:", err);
    return [];
  }
}
