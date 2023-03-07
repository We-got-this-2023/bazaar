import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "../components/Form";
import Input from "../components/Input";
import SearchResults from "./SearchResults";

interface FormData {}

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
  // tags - all tags
  // notags - no tags

  const [searchParams] = useSearchParams(),
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
    tags = searchParams.get("tags"),
    notags = searchParams.get("notags"),
    query =
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
        .join("&"),
    { data, isLoading, error } = useQuery(["search"], {
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

  const onSubmit = async (data: FormData) => {
    sessionStorage.setItem("search", JSON.stringify(data));
  };

  return (
    <div className="mt-2 flex gap-3">
      <div className="flex w-[24rem] flex-col items-center rounded-2xl bg-neutral-200 p-4 shadow-[3px_3px_10px_1px_#00000060] dark:bg-neutral-800 max-md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex justify-between gap-20 p-3">
          <div className="flex gap-2">
            <Form
              onSubmit={onSubmit}
              className="flex h-full flex-col items-center gap-2"
            >
              <Input
                name="query_time"
                type="number"
                placeholder="0"
                className="appearance-none rounded-lg bg-white p-1 text-black [-moz-appearance:textfield] dark:bg-black dark:text-white"
              />

              <button
                className="rounded-lg bg-green-600 p-2 text-white shadow-lg dark:bg-green-400 dark:text-black"
                type="submit"
              >
                Save Changes
              </button>
            </Form>
          </div>
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
      {results && <SearchResults data={results} />}
    </div>
  );
}
