import { FC, Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/auth";

interface AuthProps {
  children: ReactNode;
}
const Auth: FC<AuthProps> = ({ children }) => {

  const navigate = useNavigate()
  useEffect(() => {
    const user = getUser();

    if (user == null) {
      navigate("/login")
    }
  }, [navigate])
  

  return <Fragment>{children}</Fragment>;
};

export default Auth;
