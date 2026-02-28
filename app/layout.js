import { ThemeProvider } from "next-themes";
import styles from "./_components/Header.module.css";
import ToggleTheme from "./_components/ToggleTheme";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

export const metadata = {
  title: "Explore Nations | Interactive World Countries Directory",
  description:
    "Discover detailed information about every country across the globe. Filter by region and search for real-time data.",
};

export const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nunito.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <header className={styles.header}>
            <div className={`container ${styles.container}`}>
              <h1>Where is the world?</h1>
              <ToggleTheme />
            </div>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
