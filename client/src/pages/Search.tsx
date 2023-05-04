import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterForm from "../cards/Filters";
import SearchResults from "../components/SearchResults";
import useSearch from "../utils/useSearch";

interface FormData {
  t: "Today" | "This Week" | "This Month" | "This Year" | "All Time"; // Filter by time
  rlo: number; // Filter by rating lower bound
  rhi: number; // Filter by rating upper bound
  clo: number; // Filter by cost lower bound
  chi: number; // Filter by cost upper bound
  s: "Date" | "Rating" | "Cost"; // Sort by
  o: "Ascending" | "Descending"; // Sort order
  atags: string[]; // Filter by must-have tags
  ntags: string[]; // Filter by cannot-have tags
  stags: string[]; // Filter by has-some tags
}

export default function Search() {
  const [results, setResults] = useState([]);

  const sessionParams: FormData = JSON.parse(
    sessionStorage.getItem("searchParams") || "{}"
  );

  const [searchParams] = useSearchParams();
  const queryString = buildQuery(searchParams, sessionParams);
  const cleanQueryString = cleanQuery(queryString);

  const [page, setPage] = useState(1);

  const { data, isLoading } = useSearch(cleanQueryString, page);

  useEffect(() => {
    if (data) setResults(data.products); // need to set image and display it
  }, [data]);

  async function setSessionParams(data: FormData) {
    console.log(data);
    sessionStorage.setItem("searchParams", JSON.stringify(data || {}));
  }

  return (
    <div className="mt-2 flex gap-3">
      <FilterForm onSubmit={setSessionParams} session={sessionParams} />
      {searchParams.entries() && (
        <>
          {isLoading && <div>Loading...</div>}
          {results && (
            <>
              <SearchResults data={results} />
              <div className="absolute left-[48%] bottom-[-280px] flex flex-row">
                {/* updating page number for pagination */}
                <button
                  className=""
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  -
                </button>
                <div className="">{page}</div>
                <button onClick={() => setPage((prev) => prev + 1)}> + </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function buildQuery(searchParams: URLSearchParams, sessionParams: FormData) {
  const queryParams = [
    ["q", searchParams.get("q")],
    ["t", searchParams.get("t") || sessionParams.t],
    ["rlo", searchParams.get("rlo") || sessionParams.rlo],
    ["rhi", searchParams.get("rhi") || sessionParams.rhi],
    ["clo", searchParams.get("clo") || sessionParams.clo],
    ["chi", searchParams.get("chi") || sessionParams.chi],
    ["s", searchParams.get("s") || sessionParams.s],
    ["o", searchParams.get("o") || sessionParams.o],
    ["p", searchParams.get("p")],
    ["stags", searchParams.get("stags") || sessionParams.stags],
    ["atags", searchParams.get("atags") || sessionParams.atags],
    ["ntags", searchParams.get("ntags") || sessionParams.ntags],
  ];
  const queryString = queryParams
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString ? `?${queryString}` : "";
}

function cleanQuery(query: string) {
  const replacements = [
    ["This Week", "week"],
    ["This Month", "month"],
    ["This Year", "year"],
    ["All Time", "time"],
    ["Today", "today"],
    ["Date", "date"],
    ["Rating", "rating"],
    ["Cost", "cost"],
    ["Ascending", "asc"],
    ["Descending", "desc"],
  ];
  let cleanQuery = query;
  for (const [from, to] of replacements)
    cleanQuery = cleanQuery.replaceAll(from, to);
  return cleanQuery;
}
