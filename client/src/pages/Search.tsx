import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "../components/Form";
import {
  FancyInput as Input,
  FancySelect as Select,
} from "../components/Input";
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
              <label htmlFor="query_time">Results from..</label>
              <Input
                id="query_time"
                name="query_time"
                type="number"
                placeholder="0"
                className="mx-0 w-16"
              />
              <label htmlFor="query_rating_lower">Rating</label>
              <div className="flex gap-2">
                <Input
                  id="query_rating_lower"
                  name="query_rating_lower"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="0"
                  className="mx-0 w-16"
                />
                _
                <Input
                  id="query_rating_upper"
                  name="query_rating_upper"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="5"
                  className="mx-0 w-16"
                />
              </div>
              <label htmlFor="query_cost_lower">Cost</label>
              <div className="flex gap-2">
                <Input
                  id="query_cost_lower"
                  name="query_cost_lower"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="mx-0 w-16"
                />
                _
                <Input
                  id="query_cost_upper"
                  name="query_cost_upper"
                  type="number"
                  min="0"
                  placeholder="∞"
                  className="mx-0 w-16"
                />
              </div>
              <label htmlFor="query_sort_by">Sort By</label>
              <Select
                id="query_sort_by"
                name="query_sort_by"
                className="mx-0 w-32"
                placeholder="Rating"
              >
                <option value="Time" />
                <option value="Rating" />
                <option value="Cost" />
              </Select>
              <label htmlFor="query_sort_dir">Order</label>
              <Select
                id="query_sort_dir"
                name="query_sort_dir"
                className="mx-0 w-32"
                placeholder="Ascending"
              >
                <option value="Ascending" />
                <option value="Descending" />
              </Select>
              <button
                className="rounded-lg bg-green-600 p-2 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-800 hover:shadow-xl dark:bg-green-400 dark:text-black dark:hover:bg-green-500"
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
