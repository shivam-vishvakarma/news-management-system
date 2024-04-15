import { createContext, useContext } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const IsDarkModeContext = createContext();
export const useIsDarkMode = () => useContext(IsDarkModeContext);