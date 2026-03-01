import { getAllCountries, getCountry } from "@/app/_lib/data-service";
import styles from "../../_components/CountryDetails.module.css";
import CountryBorders from "@/app/_components/CountryBorders";
import { Suspense } from "react";
import BackButton from "@/app/_components/BackButton";
import Image from "next/image";
import Spinner from "@/app/_components/Spinner";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { code } = await params;
  const country = await getCountry(code);
  if (!country) {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }
  return {
    title: `${country.name.common} | Explore Nations`,
    description: `Learn about ${country.name.common} — population, region, capital, and more.`,
  };
}

async function CountryDetails({ params }) {
  const { code } = await params;
  const country = await getCountry(code);
  if (!country) notFound();

  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    currencies,
    languages,
    borders,
  } = country;

  const countryName = name?.common ?? "Unknown Country";
  const nativeName =
    Object.values(name?.nativeName ?? {})[0]?.official || countryName;
  const currencyName = Object.values(currencies ?? {})[0]?.name ?? "None";
  const languageList = Object.values(languages ?? {});
  const capitalText = capital?.join(", ") ?? "N/A";

  function joinWithAnd(array) {
    if (!array || array.length === 0) return "N/A";
    if (array.length === 1) return array[0];
    return array.slice(0, -1).join(", ") + " and " + array.at(-1);
  }

  return (
    <article className={styles.countryDetails}>
      <div className="container">
        <BackButton />

        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image
              src={flags.svg}
              alt={flags.alt || `${name.common} flag`}
              fill
              className={styles.flag}
              sizes="(max-width: 950px) 100vw, 50vw"
              priority
            />
          </div>

          <section className={styles.details}>
            <h2>{countryName}</h2>

            <dl className={styles.info}>
              <div>
                <div className={styles.description}>
                  <dt>native name: </dt>
                  <dd>{nativeName}</dd>
                </div>
                <div className={styles.description}>
                  <dt>population: </dt>
                  <dd>{population.toLocaleString()}</dd>
                </div>
                <div className={styles.description}>
                  <dt>region: </dt>
                  <dd>{region}</dd>
                </div>
                <div className={styles.description}>
                  <dt>sub region: </dt>
                  <dd>{subregion}</dd>
                </div>
                <div className={styles.description}>
                  <dt>capital: </dt>
                  <dd>{capitalText}</dd>
                </div>
              </div>

              <div>
                <div className={styles.description}>
                  <dt>currencies: </dt>
                  <dd>{currencyName}</dd>
                </div>
                <div className={styles.description}>
                  <dt>languages: </dt>
                  <dd>{joinWithAnd(languageList)}</dd>
                </div>
              </div>

              <Suspense fallback={<Spinner />}>
                <CountryBorders codes={borders} />
              </Suspense>
            </dl>
          </section>
        </div>
      </div>
    </article>
  );
}

export default CountryDetails;
