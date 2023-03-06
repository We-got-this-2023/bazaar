const isEmptySearch = () => {
  const href = location.href.split("/");
  const index = href.indexOf("search");
  const after = href[index + 1];
  if (index !== -1 && (!after || !after.includes("?"))) return true;
  return false;
};
export default isEmptySearch;
