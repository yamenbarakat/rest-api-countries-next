import styles from "./Countries.module.css";
import { getAllCountries } from "../_lib/data-service";
import Link from "next/link";
import Image from "next/image";

function filterCountries(countries, region, query) {
  let filtered = countries;

  if (region && region !== "All") {
    filtered = filtered.filter((c) => c.region === region);
  }

  if (query) {
    filtered = filtered.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filtered;
}

async function Countries({ region, query }) {
  const countries = await getAllCountries();

  const filteredCountries = filterCountries(countries, region, query);

  return (
    <section className={styles.countries}>
      <div className={"container"}>
        {filteredCountries.length === 0 ? (
          <p className={styles.noResult}>No Results Found</p>
        ) : (
          <ul className={styles.countriesList}>
            {filteredCountries.map((country, index) => (
              <Country
                country={country}
                key={country.name.common}
                priority={index < 8}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Country({ country, priority }) {
  return (
    <li className={styles.country}>
      <Link href={`/country/${country.cca3}`}>
        <div className={styles.flagWrapper}>
          <Image
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            fill
            className={styles.flagImage}
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className={styles.details}>
          <h2>{country.name.common}</h2>
          <dl>
            <div>
              <dt>Population:</dt>{" "}
              <dd>{country.population.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Region:</dt> <dd>{country.region}</dd>
            </div>
            <div>
              <dt>Capital:</dt> <dd>{country.capital?.join(", ") ?? "N/A"}</dd>
            </div>
          </dl>
        </div>
      </Link>
    </li>
  );
}

export default Countries;
