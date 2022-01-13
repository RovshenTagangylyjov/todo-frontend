import { obj } from "@/types";

export function mergeQuery(query: obj, currentQuery: obj): obj {
  const mergedQuery = { ...currentQuery, ...query } as obj;

  if (query.sort && query.sort === currentQuery.sort)
    mergedQuery.order = mergedQuery.order === "desc" ? "asc" : "desc";
  else delete mergedQuery.order;

  return mergedQuery;
}
