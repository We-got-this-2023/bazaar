import { useSearchParams } from "react-router-dom";

export default function Search({ className }: { className?: string }) {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}
