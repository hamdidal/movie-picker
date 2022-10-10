import { FC, Fragment, ReactNode, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { onAuthChange } from "../../services/auth";
import Loading from "../Loading";

interface AuthProps {
  children: ReactNode;
}
const Auth: FC<AuthProps> = ({ children }) => {
  const { user, setUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false)
    onAuthChange((authUser: { displayName: any; uid: any } | null) => {
      if (authUser === null) {
        navigate("/login");
      } else {
        setUser({
          userName: authUser.displayName ?? "",
          userId: authUser.uid ?? "",
        });
        setLoading(true)
        navigate("/");
        setLoading(false)
      }
    });
  }, [user, setUser, navigate]);
  return (
    <Fragment>
    {loading && <Loading/>}
    {children}
    </Fragment>
  )
};

export default Auth;
