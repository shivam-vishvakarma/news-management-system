import { UserContext, IsDarkModeContext } from "./contexts";
import { useState } from "react";

/*
{
    token: "0aac4043e3e9200a8f700e9bcfbadafd745047dd",
    user: {
      email: "aishapatel@gmail.com",
      first_name: "Blake",
      last_name: "Browning",
      user_roll: "user",
      username: "shivam123",
    },
}
*/

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
