import { FC, Fragment, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, setUser } from "../services/auth";

interface AuthProps {
  children: ReactNode;
}
const Auth: FC<AuthProps> = ({ children }) => {

  const location = useLocation()

  const navigate = useNavigate()
  useEffect(() => {
    const user = getUser();
    if (!location.pathname.includes('register')) {
      if (user == null) {
        navigate('/login')
      } else if (location.pathname === '/login') {
        navigate('/')
      }
    }
  }, [location.pathname, navigate])
  

  return <Fragment>{children}</Fragment>;
};

export default Auth;
