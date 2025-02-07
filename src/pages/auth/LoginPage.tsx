import { useEffect, useState } from "react";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context";
import { validateEmail } from "../../utils/validate";


function LoginPage() {
  const { onLogin } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }
  ));
  };

  const {email,password} = credentials
  const [emailIsValid,validEmail] = useState(false)

  const handleValidateEmail =() =>{
    const isValid = validateEmail(email)
    validEmail(isValid)
  } 
  useEffect(()=>{
    handleValidateEmail()
  },[email])
  
  const isDisabled = !email || !password || isLoading || !emailIsValid

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await login(credentials);
      onLogin();
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      console.log(error);
      /* TODOOOOOOOOO*/
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-1/3 mt-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-white p-6 rounded-lg shadow-lg w-1/2 bg-sky-700 flex flex-col justify-center items-center text-center"
      >
        <h1 className="text-2xl mt-2.5 mb-1">Iniciar Sesión</h1>

        <FormField
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="mt-4 border-2 rounded-lg "
          placeholder="Email"
        />

        <FormField
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="mt-4 border-2 rounded-lg "
        />

        <Button $variant="primary" type="submit" disabled={isDisabled} className="mt-4">
          Iniciar Sesión
        </Button>
        {email.length < 5 ? null: emailIsValid ? null : <span className="text-red-600">Por favor ingresa un email correcto</span> }
        
      </form>
    </div>
  );
}

export default LoginPage;
