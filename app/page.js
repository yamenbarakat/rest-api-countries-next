import SearchBar from "./_components/SearchBar";
import SearchCountry from "./_components/SearchCountry";
import FilterRegion from "./_components/FilterRegion";
import Countries from "./_components/Countries";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";

export default async function Home({ searchParams }) {
  const { region, query } = await searchParams;
  return (
    <>
      <SearchBar>
        <SearchCountry />
        <FilterRegion />
      </SearchBar>

      <Suspense fallback={<Spinner />} key={`${region}-${query}`}>
        <Countries region={region} query={query} />
      </Suspense>
    </>
  );
}
