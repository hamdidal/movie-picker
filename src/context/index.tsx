import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserModel } from "../models/user";

export const GlobalContext = React.createContext({
  user: undefined,
  setUser: () => {},
} as GlobalContextModel);

interface Props {
  children?: ReactNode;
}

interface GlobalContextModel {
  user: UserModel | undefined;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
}
export const GlobalContextProvider = (props: Props) => {
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("register")) {
      if (user == null) {
        navigate("/login");
      } else if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [location.pathname, navigate, user]);

  const data: GlobalContextModel = {
    user,
    setUser,
  };
  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};
