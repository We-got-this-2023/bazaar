import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResults from "./SearchResults";

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
  // ntags - no tags

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
    `q=${q}` +
    (t ? `&t=${t}` : "") +
    (rlo ? `&r=${rlo}` : "") +
    (rhi ? `&r=${rhi}` : "") +
    (s ? `&s=${s}` : "") +
    (o ? `&o=${o}` : "") +
    (clo ? `&clo=${clo}` : "") +
    (chi ? `&chi=${chi}` : "") +
    (p ? `&p=${p}` : "") +
    (stags ? `&stags=${stags}` : "") +
    (tags ? `&tags=${tags}` : "") +
    (notags ? `&notags=${notags}` : "");

  const handleSubmit = async () => {
    const data = await fetch("http://localhost:3000/products?" + query).then(
      (res) => res.json()
    );
    setResults(data);
  };

  useEffect(() => {
    if (q) handleSubmit();
  }, []);

  return (
    <div>
      <h1>Search</h1>
      {results && <SearchResults data={results} />}
    </div>
  );
}
