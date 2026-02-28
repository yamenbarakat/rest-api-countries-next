const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,cca3";

export async function getAllCountries() {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 86400 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch countries: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Network error during initial country fetch:", err);
    return [];
  }
}

export async function getCountry(code) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch country (${code}): ${res.status}`);
    }

    const data = await res.json();

    return data?.[0] ?? null;
  } catch (err) {
    console.error(`Network error while fetching country (${code}):`, err);
    return null;
  }
}

export async function getCountriesByCodes(codes) {
  if (!codes || !Array.isArray(codes) || codes.length === 0) return [];

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}&fields=name,cca3`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch border countries: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Network error while fetching countries by codes:", err);
    return [];
  }
}
