import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/authentication/RegisterForm";
import { useContext, useEffect } from "react";
import AuthenticationContext from "../store/authentication-context";

function RegisterPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    authCtx.updateAuthentication();
    if (authCtx.isLoggedIn()) {
      navigate(`/`);
    }
  }, []);
  return (
    <>
      <div className="title">Register</div>
      <RegisterForm />
    </>
  );
}

export default RegisterPage;
