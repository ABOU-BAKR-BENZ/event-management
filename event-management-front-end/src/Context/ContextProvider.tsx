import { createContext, useContext, useState, ReactNode } from "react";
import { ContextPropsTypes } from "../Interfaces";



const StateContext = createContext<ContextPropsTypes>({
  user: null,
  token: null,
  userRole: null,
  setUser: () => {},
  setToken: () => {},
  setUserRole: () => {},
});

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [user, _setUser] = useState<string | null>(
    localStorage.getItem("USER_NAME")
  );
  const [userRole, _setUserRole] = useState<string | null>(
    localStorage.getItem("USER_ROLE")
  );
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", String(newToken));
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUser = (newUserName: string | null) => {
    _setUser(newUserName);
    if (newUserName) {
      localStorage.setItem("USER_NAME", String(newUserName));
    } else {
      localStorage.removeItem("USER_NAME");
    }
  };

  const setUserRole = (newUserRole: string | null) => {
    _setUserRole(newUserRole);
    if (newUserRole) {
      localStorage.setItem("USER_ROLE", String(newUserRole));
    } else {
      localStorage.removeItem("USER_ROLE");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
