import Link from "next/link";
import { getCountriesByCodes } from "../_lib/data-service";
import styles from "./CountryBorders.module.css";

async function CountryBorders({ codes }) {
  if (!codes || codes.length === 0) return null;

  const borders = await getCountriesByCodes(codes);

  return (
    <div className={styles.bordersContainer}>
      <p>Border Countries:</p>
      <div className={styles.borders}>
        {borders.map((border) => (
          <Link href={`/country/${border.cca3}`} key={border.cca3}>
            {border.name.common}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryBorders;
