# Rest Countries Explorer (Next.js)

A Next.js app that explores country data from the REST Countries API. Browse a full list of countries, search by name, filter by region, and open a country page to see detailed information such as population, capital, currencies, languages, and border countries.

## Features

- Search countries by name
- Filter by region
- Country details page with flags, metadata, and borders
- Server data fetching with caching and revalidation
- Image optimization via `next/image`

## Tech Stack

- Next.js App Router
- React
- css modules
- REST Countries API

## Data Source

This project uses the REST Countries API:

- `https://restcountries.com/v3.1/all`
- `https://restcountries.com/v3.1/alpha/{code}`

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run linting

## Project Structure

- `app/page.js` — home page with search and region filters
- `app/country/[code]/page.js` — country details page
- `app/_lib/data-service.js` — API fetch helpers

## Notes

Data is cached and revalidated every 24 hours using Next.js `fetch` revalidation.
