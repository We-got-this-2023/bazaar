import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterForm from "../components/FilterForm";
import SearchResults from "./SearchResults";

interface FormData {
  t: "Today" | "This Week" | "This Month" | "This Year" | "All Time";
  rlo: number;
  rhi: number;
  clo: number;
  chi: number;
  s: "Date" | "Rating" | "Cost";
  o: "Ascending" | "Descending";
  atags: string[];
  ntags: string[];
  stags: string[];
}

export default function Search() {
  // Legend:
  // q - query
  // t - time ago
  // rlo - rating lower bound
  // rhi - rating upper bound
  // clo - cost lower bound
  // chi - cost upper bound
  // s - sort by
  // o - order
  // p - page
  // stags - some tags
  // atags - all tags
  // ntags - no tags

  const item = sessionStorage.getItem("searchParams"),
    session = (item ? JSON.parse(item) : {}) as FormData,
    [searchParams] = useSearchParams(),
    [results, setResults] = useState([]),
    q = searchParams.get("q"),
    t = searchParams.get("t"),
    rlo = searchParams.get("r"),
    rhi = searchParams.get("r"),
    s = searchParams.get("s"),
    o = searchParams.get("o"),
    clo = searchParams.get("clo"),
    chi = searchParams.get("chi"),
    p = searchParams.get("p"),
    stags = searchParams.get("stags"),
    atags = searchParams.get("atags"),
    ntags = searchParams.get("ntags"),
    query = q
      ? "?" +
        [
          q ? `q=${q}` : "",
          t || session.t ? `t=${t || session.t}` : "",
          rlo || session.rlo ? `rlo=${rlo || session.rlo}` : "",
          rhi || session.rhi ? `rhi=${rhi || session.rhi}` : "",
          clo || session.clo ? `clo=${clo || session.clo}` : "",
          chi || session.chi ? `chi=${chi || session.chi}` : "",
          s || session.s ? `s=${s || session.s}` : "",
          o || session.o ? `o=${o || session.o}` : "",
          p ? `p=${p}` : "",
          stags || session.stags ? `stags=${stags || session.stags}` : "",
          atags || session.atags ? `atags=${atags || session.atags}` : "",
          ntags || session.ntags ? `ntags=${ntags || session.ntags}` : "",
        ]
          .filter((t) => t)
          .join("&")
      : "",
    cleanQuery = (() => {
      return query
        .replaceAll("This Week", "week")
        .replaceAll("This Month", "month")
        .replaceAll("This Year", "year")
        .replaceAll("All Time", "time")
        .replaceAll("Today", "today")
        .replaceAll("Date", "date")
        .replaceAll("Rating", "rating")
        .replaceAll("Cost", "cost")
        .replaceAll("Ascending", "asc")
        .replaceAll("Descending", "desc");
    })(),
    // Leaving this unused error, as I haven't implemented error handling yet
    { data, isLoading, error } = useQuery(["search"], {
      queryFn: async () => {
        try {
          const url = encodeURI(
            `${import.meta.env.VITE_API}/products${cleanQuery}`
          );
          const json = await (await fetch(url)).json();
          return json;
        } catch (err) {
          console.error(err);
          return [];
        }
      },
    });

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    sessionStorage.setItem("searchParams", JSON.stringify(data));
  };

  return (
    <div className="mt-2 flex gap-3">
      <FilterForm onSubmit={onSubmit} session={session} />
      {searchParams.entries() && (
        <>
          {isLoading && <div>Loading...</div>}
          {results && <SearchResults data={results} />}
        </>
      )}
    </div>
  );
}
