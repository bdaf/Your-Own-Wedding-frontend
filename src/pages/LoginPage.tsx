import { useNavigate } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import { useContext, useEffect } from "react";
import AuthenticationContext from "../store/authentication-context";

function LoginPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    authCtx.updateAuthentication(null);
    if (authCtx.isLoggedIn()) {
      navigate(`/`);
    }
  }, []);
  return (
    <>
      <div className="title">Login </div>
      <LoginForm />
    </>
  );
}

export default LoginPage;
