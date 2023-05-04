import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useSearch(cleanQueryString: string, page: number) {
  const query = useQuery({
    queryKey: ["search", page],
    queryFn: () => fetchProducts(page, cleanQueryString),
  });
  return query;
}

async function fetchProducts(page: number, cleanQueryString: string) {
  try {
    const url = encodeURI(
      `${
        import.meta.env.VITE_API
        //need to update page number on pagination
      }/product/params?p=${page}${cleanQueryString}`
    );
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    if (res.json) return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
