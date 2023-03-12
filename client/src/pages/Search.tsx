import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "../components/Form";
import {
  FancyInput as Input,
  FancySelect as Select,
} from "../components/Input";
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
    { data, isLoading, error } = useQuery(["search"], {
      queryFn: async () => {
        try {
          const json = await (
            await fetch(`http://localhost:3000/products${query}`)
          ).json();
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
      <div className="flex w-[24rem] flex-col items-center rounded-2xl bg-neutral-200 p-4 shadow-[3px_3px_10px_1px_#00000060] transition-colors duration-200 dark:bg-neutral-900 max-md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex justify-between gap-20 p-3">
          <div className="flex gap-2">
            <Form
              onSubmit={onSubmit}
              className="flex h-full flex-col items-center gap-2"
            >
              <label htmlFor="t">Results from..</label>
              <Select
                id="t"
                name="t"
                initialValue={(session.t || 0).toString()}
              >
                <option value="Today" />
                <option value="This Week" />
                <option value="This Month" />
                <option value="This Year" />
                <option value="All Time" />
              </Select>
              <label htmlFor="rlo">Rating</label>
              <div className="flex gap-2">
                <Input
                  id="rlo"
                  name="rlo"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="0"
                  className="mx-0 w-16"
                  initialValue={(session.rlo || 0).toString()}
                />
                <Input
                  id="rhi"
                  name="rhi"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="5"
                  className="mx-0 w-16"
                  initialValue={(session.rhi || 0).toString()}
                />
              </div>
              <label htmlFor="clo">Cost</label>
              <div className="flex gap-2">
                <Input
                  id="clo"
                  name="clo"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="mx-0 w-16"
                  initialValue={(session.clo || 0).toString()}
                />
                _
                <Input
                  id="chi"
                  name="chi"
                  type="number"
                  min="0"
                  placeholder="∞"
                  className="mx-0 w-16"
                  initialValue={(session.chi || 0).toString()}
                />
              </div>
              <label htmlFor="s">Sort By</label>
              <Select
                id="s"
                name="s"
                className="mx-0 w-32"
                placeholder="Rating"
                initialValue={(session.s || 0).toString()}
              >
                <option value="Time" />
                <option value="Rating" />
                <option value="Cost" />
              </Select>
              <label htmlFor="o">Order</label>
              <Select
                id="o"
                name="o"
                className="mx-0 w-32"
                placeholder="Ascending"
                initialValue={(session.o || 0).toString()}
              >
                <option value="Ascending" />
                <option value="Descending" />
              </Select>
              <label htmlFor="tags">Tags</label>
              <button
                className="mt-6 rounded-lg bg-green-600 p-2 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-800 hover:shadow-[0_0_10px_1px_#33aa3350] dark:bg-green-400 dark:text-black dark:hover:bg-green-500"
                type="submit"
              >
                Save Changes
              </button>
            </Form>
          </div>
        </div>
      </div>
      {searchParams.entries() && (
        <>
          {isLoading && <div>Loading...</div>}
          {results && <SearchResults data={results} />}
        </>
      )}
    </div>
  );
}
