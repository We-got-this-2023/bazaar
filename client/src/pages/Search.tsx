import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search({ className }: { className?: string }) {
  const [searchParams] = useSearchParams();
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
    console.log(data);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      <h1>Search</h1>
      {/* Temporary Template to show query parameters */}
      <div>
        <p>q: {q ? q : "none"}</p>
        <p>t: {t ? t : "none"}</p>
        <p>rlo: {rlo ? rlo : "none"}</p>
        <p>rhi: {rhi ? rhi : "none"}</p>
        <p>s: {s ? s : "none"}</p>
        <p>o: {o ? o : "none"}</p>
        <p>clo: {clo ? clo : "none"}</p>
        <p>chi: {chi ? chi : "none"}</p>
        <p>p: {p ? p : "none"}</p>
        <p>stags: {stags ? stags : "none"}</p>
        <p>tags: {tags ? tags : "none"}</p>
        <p>notags: {notags ? notags : "none"}</p>
      </div>
    </div>
  );
}
