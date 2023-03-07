import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "../components/Form";
import {
  FancyInput as Input,
  FancySelect as Select,
} from "../components/Input";
import SearchResults from "./SearchResults";

interface SessionQueryParams {
  sq?: string;
  st?: string;
  srlo?: string;
  srhi?: string;
  sclo?: string;
  schi?: string;
  ss?: string;
  so?: string;
  sp?: string;
  sstags?: string;
  satags?: string;
  snotags?: string;
}

interface FormData {
  t: number;
  rlo: number;
  rhi: number;
  clo: number;
  chi: number;
  s: string;
  o: string;
  tags: string[];
  notags: string[];
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
  // notags - no tags
  // sq - session query
  // srlo - session rating lower bound
  // srhi - session rating upper bound
  // sclo - session cost lower bound
  // schi - session cost upper bound
  // ss - session sort by
  // so - session order
  // sp - session page
  // sstags - session some tags
  // satags - session all tags
  // snotags - session no tags

  const {
    sq,
    st,
    srlo,
    srhi,
    sclo,
    schi,
    ss,
    so,
    sp,
    sstags,
    satags,
    snotags,
  } = JSON.parse(sessionStorage.getItem("query") || "{}") as SessionQueryParams;

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
    atags = searchParams.get("atags"),
    notags = searchParams.get("notags"),
    query =
      "?" +
      [
        q ? `q=${q}` : sq ?? "",
        t ? `t=${t}` : st ?? "",
        rlo ? `rlo=${rlo}` : srlo ?? "",
        rhi ? `rhi=${rhi}` : srhi ?? "",
        clo ? `clo=${clo}` : sclo ?? "",
        chi ? `chi=${chi}` : schi ?? "",
        s ? `s=${s}` : ss ?? "",
        o ? `o=${o}` : so ?? "",
        p ? `p=${p}` : sp ?? "",
        stags ? `stags=${stags}` : sstags ?? "",
        atags ? `atags=${atags}` : satags ?? "",
        notags ? `notags=${notags}` : snotags ?? "",
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
    console.log(data);
    sessionStorage.setItem("search", JSON.stringify(data));
  };

  return (
    <div className="mt-2 flex gap-3">
      <div className="flex w-[24rem] flex-col items-center rounded-2xl bg-neutral-200 p-4 shadow-[3px_3px_10px_1px_#00000060] transition-colors duration-200 dark:bg-neutral-800 max-md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex justify-between gap-20 p-3">
          <div className="flex gap-2">
            <Form
              onSubmit={onSubmit}
              className="flex h-full flex-col items-center gap-2"
            >
              <label htmlFor="t">Results from..</label>
              <Input
                id="t"
                name="t"
                type="number"
                placeholder="0"
                className="mx-0 w-16"
              />
              <label htmlFor="rlo">Rating</label>
              <div className="flex gap-2">
                <Input
                  id="rlo"
                  name="rlo"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="5"
                  className="mx-0 w-16"
                />
                <Input
                  id="rhi"
                  name="rhi"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="5"
                  className="mx-0 w-16"
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
                />
                _
                <Input
                  id="chi"
                  name="chi"
                  type="number"
                  min="0"
                  placeholder="∞"
                  className="mx-0 w-16"
                />
              </div>
              <label htmlFor="s">Sort By</label>
              <Select
                id="s"
                name="s"
                className="mx-0 w-32"
                placeholder="Rating"
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
              >
                <option value="Ascending" />
                <option value="Descending" />
              </Select>
              <label htmlFor="tags">Tags</label>
              <button
                className="mt-6 rounded-lg bg-green-600 p-2 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-800 hover:shadow-xl dark:bg-green-400 dark:text-black dark:hover:bg-green-500"
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
