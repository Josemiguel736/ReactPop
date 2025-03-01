import { render , screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginPage from "../LoginPage"
import { Provider } from "react-redux"
import { AdvertType } from "../../adverts/types"
import * as actions from "../../../store/actions"
import { Credentials } from "../types"
import { State } from "../../../store/reducers"
import { Store } from "redux"


vi.mock("../../../store/actions")

describe("LoginPage", () => {

    const adverts:AdvertType[] =[
            {createdAt:"28/02/2025",
              id:"12/22as-22",
              name:"Test advert",
              photo:"photo/url",
              price:20,
              sale:true,
              tags:["motor"]        
            }]
    const tags:string[] = ["motor","lifestile","other tag"]

    const initialState:State = {
        auth:true,
        adverts:{data:adverts,loaded:true},
       tags:{data:tags,loaded:false,error:null},
        ui:{error:null,pending:false}    }

    const credentials:Credentials ={
        email:"admin@example.com",
        password:"admin"
    }

    const mockStore: Partial<Store<State>> = {
        getState: () => initialState,
        subscribe: vi.fn(),
        dispatch: vi.fn(),
      };

    const renderComponent = (error?:Error) =>{
        if(error){
            initialState.ui.error = error
        }
        return(
        render(<Provider store={mockStore as Store<State>}>
         <LoginPage/></Provider>))}

    test("should render", () =>{
       const {container} = renderComponent()
       expect(container).toMatchSnapshot()       
    })

    test("should dispatch login action", async ()=>{
        renderComponent()

       const emailInput = screen.getByPlaceholderText("Email")
       const passwordInput = screen.getByPlaceholderText("Contraseña")
       const button = screen.getByRole("button")
       const checked = screen.getByRole("checkbox")

       expect(button).toHaveTextContent("Iniciar Sesión")
       expect(button).toBeDisabled()
       
       await userEvent.type(emailInput,credentials.email)
       await userEvent.type(passwordInput,credentials.password)

       await userEvent.click(checked)

       expect(button).toBeEnabled()

       await userEvent.click(button)

       expect(actions.authLogin).toHaveBeenCalledWith(credentials,true)
       expect(actions.authLogin).toHaveBeenCalledTimes(1)
       
    })

    test("Test to render error", async ()=>{
        const {container} = renderComponent(new Error("UNAUTHORIZED"))        
        const alert = screen.getByRole("alert")

        expect(alert).toHaveTextContent("Por favor ingrese un usuario y contraseña válidos")
        expect(container).toMatchSnapshot()

        await userEvent.click(alert)
        expect (actions.uiResetError).toHaveBeenCalled()      

    })

    test("Test to render other error", async ()=>{
        renderComponent(new Error("Test"))  
        const alert = screen.getByRole("alert")

        expect(alert).toHaveTextContent("Test")
        await userEvent.click(alert)

        expect (actions.uiResetError).toHaveBeenCalled()       
    })
})