import { Form } from "./Form";
import Input from "./Input";
import Select from "./Select";

export default function FilterForm({
  onSubmit,
  session,
}: {
  onSubmit: (data: {
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
  }) => Promise<void>;
  session: any;
}) {
  return (
    <div
      className="
    flex w-[16rem] flex-col items-center rounded-2xl 
    bg-neutral-200 p-4 shadow-[3px_3px_10px_1px_#00000060] 
    transition-colors duration-200 dark:bg-neutral-900 max-md:hidden
    "
    >
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
              initialValue={session.t ? session.t.toString() : undefined}
            >
              <option value="All Time" />
              <option value="Today" />
              <option value="This Week" />
              <option value="This Month" />
              <option value="This Year" />
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
                initialValue={session.rlo ? session.rlo.toString() : undefined}
              />
              <Input
                id="rhi"
                name="rhi"
                type="number"
                min="0"
                max="5"
                placeholder="5"
                className="mx-0 w-16"
                initialValue={session.rhi ? session.rhi.toString() : undefined}
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
                initialValue={session.clo ? session.clo.toString() : undefined}
              />
              _
              <Input
                id="chi"
                name="chi"
                type="number"
                min="0"
                placeholder="∞"
                className="mx-0 w-16"
                initialValue={session.chi ? session.chi.toString() : undefined}
              />
            </div>
            <label htmlFor="s">Sort By</label>
            <Select
              id="s"
              name="s"
              className="mx-0 w-32"
              placeholder="Rating"
              initialValue={session.s ? session.s.toString() : undefined}
            >
              <option value="Rating" />
              <option value="Time" />
              <option value="Cost" />
            </Select>
            <label htmlFor="o">Order</label>
            <Select
              id="o"
              name="o"
              className="mx-0 w-32"
              placeholder="Ascending"
              initialValue={session.o ? session.o.toString() : undefined}
            >
              <option value="Descending" />
              <option value="Ascending" />
            </Select>
            <label htmlFor="tags">Tags</label>
            <button
              className="
              mt-6 rounded-lg bg-green-600 p-2 
              text-white shadow-lg transition-all duration-200 
              hover:scale-105 hover:bg-green-800 hover:shadow-[0_0_10px_1px_#33aa3350] 
              dark:bg-green-400 dark:text-black dark:hover:bg-green-500
              "
              type="submit"
            >
              Save Changes
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
