import { UserContext, IsDarkModeContext } from "./contexts";
import { useState } from "react";

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <IsDarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
      </IsDarkModeContext.Provider>
    </UserContext.Provider>
  );
}