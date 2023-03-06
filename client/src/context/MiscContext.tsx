import { Context, createContext, useContext, useState } from "react";
import isEmptySearch from "../utils/isEmptySearch";

interface MiscContextI extends Context<{}> {
  searchEmpty: boolean;
}

const MiscContext = createContext({}) as MiscContextI;

export function MiscProvider({ children }: { children: JSX.Element }) {
  const [searchIsEmpty, setSearchIsEmpty] = useState<boolean>(isEmptySearch());

  const value = { searchIsEmpty };

  return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>;
}

export function useMisc() {
  return useContext(MiscContext) as MiscContextI;
}
