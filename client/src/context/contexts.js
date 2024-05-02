import { createContext, useContext } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {}});
export const useUser = () => useContext(UserContext);

export const IsDarkModeContext = createContext({ isDarkMode: false, setIsDarkMode: () => {}});
export const useIsDarkMode = () => useContext(IsDarkModeContext);