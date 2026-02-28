"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterRegion.module.css";
//import { useQuery } from "../_custom-hooks/useQuery";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const { replace } = useRouter(); // For pushing changes to the URL
  const searchParams = useSearchParams(); // For reading current URL state
  const dropdownRef = useRef(null);
  //const { setQuery } = useQuery(); //

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const currentRegion = searchParams.get("region") ?? "Filter by Region";

  function handleToggleMenu() {
    setIsOpen((open) => !open);
  }

  function handleSetRegion(region) {
    setIsOpen(false);
    //setQuery("");

    // 1. Create a URLSearchParams object from the current searchParams
    const params = new URLSearchParams(searchParams.toString());

    params.set("region", region);

    replace(`?${params.toString()}`);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className={styles.filter} ref={dropdownRef}>
      <button
        className={styles.dropdown}
        onClick={handleToggleMenu}
        aria-expanded={isOpen}
        aria-controls="region-listbox"
        aria-haspopup="listbox"
      >
        <span>{currentRegion}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={styles.dropdownIcon}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <ul id="region-listbox" role="listbox">
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => handleSetRegion(region)}
              role="option"
              aria-selected={
                currentRegion === region ||
                (currentRegion === null && region === "All")
                  ? "true"
                  : "false"
              }
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
