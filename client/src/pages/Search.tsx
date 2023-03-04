import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavigateFunction, useSearchParams } from "react-router-dom";
import SearchResults from "./SearchResults";

export function handleSearch(query = "", navigate: NavigateFunction) {
  const URL = `/search${query}`;
  const same = URL.split("?")[0] === "/search";
  navigate(URL, same ? { replace: true } : {});
}

export default function Search({ className }: { className?: string }) {
  const [searchParams] = useSearchParams(),
    [results, setResults] = useState([]);
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
  // tags - all tags
  // notags - no tags

  const q = searchParams.get("q"),
    t = searchParams.get("t"),
    rlo = searchParams.get("r"),
    rhi = searchParams.get("r"),
    s = searchParams.get("s"),
    o = searchParams.get("o"),
    clo = searchParams.get("clo"),
    chi = searchParams.get("chi"),
    p = searchParams.get("p"),
    stags = searchParams.get("stags"),
    tags = searchParams.get("tags"),
    notags = searchParams.get("notags");

  const query =
    "?" +
    [
      q ? `q=${q}` : "",
      t ? `t=${t}` : "",
      rlo ? `rlo=${rlo}` : "",
      rhi ? `rhi=${rhi}` : "",
      clo ? `clo=${clo}` : "",
      chi ? `chi=${chi}` : "",
      s ? `s=${s}` : "",
      o ? `o=${o}` : "",
      p ? `p=${p}` : "",
      stags ? `stags=${stags}` : "",
      tags ? `tags=${tags}` : "",
      notags ? `notags=${notags}` : "",
    ]
      .filter((t) => t)
      .join("&");

  const { data, isLoading, error } = useQuery(["search"], {
    queryFn: async () => {
      try {
        const json = await (
          await fetch(`http://localhost:3000/products${query}`)
        ).json();
        return json;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  });

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {results && <SearchResults data={results} />}
    </div>
  );
}
