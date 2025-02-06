import { useState } from "react";
import FormField from "../../components/shared/FormField";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useLocation, useNavigate } from "react-router-dom";



function LoginPage(){
    const location = useLocation()
    const navigate = useNavigate()

    const [userEmail,setUserEmail] = useState("")
    const handleUserEmail = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setUserEmail(event.target.value) }

    const [userPassword,setUserPassword] = useState("")
    const handleUserPassword = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setUserPassword(event.target.value)
    }

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        try {
            await login({
                email:userEmail,
                password:userPassword
            })
            const to = location.state?.from ?? "/"
            navigate(to,{replace:true})

        } catch (error) {
            console.log(error)
        /* TODOOOOOOOOO*/
            
        }
    }

    return <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <FormField
            type="text"
            name="email"
            label="Email"
            value={userEmail}
            onChange={handleUserEmail}
            />
            <FormField
            type="password"
            name="password"
            label="Contrsaseña"
            value={userPassword}
            onChange={handleUserPassword}
            />
        
        <Button
        $variant="primary"
        type="submit">
            Iniciar Sesión
        </Button>
        </form>
    </div>
  }

  export default LoginPage