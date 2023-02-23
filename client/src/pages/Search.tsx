import { useSearchParams } from "react-router-dom";

export default function Search({ className }: { className?: string }) {
  const [searchParams] = useSearchParams();
  // Legend:
  //   q - search query
  //   t - time period - default is all
  //   r - rating - default is all
  //   s - sort by - default is newest
  //   pmn - price min - default is 0
  //   pmx - price max - default is unset
  //   p - page - default is 1 (first page)
  const q = searchParams.get("q"),
    t = searchParams.get("t") || "all",
    r = searchParams.get("r") || "all",
    s = searchParams.get("s") || "newest",
    pmn = searchParams.get("pmn") || "0",
    pmx = searchParams.get("pmx") || "unset",
    p = searchParams.get("p") || "1";

  return (
    <div>
      <h1>Search</h1>
      {/* Temporary Template to show query parameters */}
      <div>
        <p>
          <strong>Query:</strong>
          {q}
        </p>
        <p>
          <strong>Time Period:</strong>
          {t}
        </p>
        <p>
          <strong>Rating:</strong>
          {r}
        </p>
        <p>
          <strong>Sort By:</strong>
          {s}
        </p>
        <p>
          <strong>Price Min:</strong>
          {pmn}
        </p>
        <p>
          <strong>Price Max:</strong>
          {pmx}
        </p>
        <p>
          <strong>Page:</strong>
          {p}
        </p>
      </div>
    </div>
  );
}
