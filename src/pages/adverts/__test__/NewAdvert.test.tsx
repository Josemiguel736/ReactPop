import {render, screen} from "@testing-library/react"
import { Store } from "redux"
import { State } from "../../../store/reducers"
import { Provider } from "react-redux"
import NewAdvertPage from "../NewAdvert"
import userEvent from "@testing-library/user-event"
import * as actions from "../../../store/actions"
import { ApiClientError } from "../../../api/error"

vi.mock("../../../store/actions")

describe("NewAdvertPage",() => {
    afterEach(()=>{
        vi.clearAllMocks()
    })

const tags:string[] = ["motor","lifestile","work"]

const initialState:State = {
    auth:true,
    adverts:{data:null,loaded:false},
   tags:{data:tags,loaded:false,error:null},
    ui:{error:null,pending:false}    }


const mockStore: Partial<Store<State>> = {
    getState: () => initialState,
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  };

  const formValues = {
    product:"Coche",
    price:"2000",
    img: new File(["Test image"],"img.png",{type:"image/png"})
  }

  const mockFormData:Partial<FormData>  = {
    append: vi.fn()
  }

const renderComponent = (error?:Error|null,tagError?:ApiClientError) =>{
     initialState.ui.error = error ?? null
     initialState.tags.error = tagError ?? null

    return(
    render(<Provider store={mockStore as Store<State>}>
     <NewAdvertPage/></Provider>))}

    test("should render",() => {
        const {container} = renderComponent()
        expect(container).toMatchSnapshot()       
    })

    test("should dispatch new advert action", async () => {
        renderComponent()
        globalThis.FormData = vi.fn(()=>mockFormData as FormData) 

        const nameInput = screen.getByPlaceholderText("Producto")
        await userEvent.type(nameInput,formValues.product)
        expect(nameInput).toHaveValue(formValues.product)

        const priceInput = screen.getByPlaceholderText("Precio")
        await userEvent.type(priceInput,formValues.price)
        expect(priceInput).toHaveValue(Number(formValues.price))

        const selectElement = screen.getByRole("combobox")
        expect(selectElement).toBeInTheDocument()

        const buyOption = screen.getByRole("option",{name:"Compra"})
        expect(buyOption).toBeInTheDocument()

        
        const saleOption = screen.getByRole("option",{name:"Venta"})
        expect(saleOption).toBeInTheDocument()
        
        await userEvent.selectOptions(selectElement,"Compra")

        const lifestileTag = screen.getByText("lifestile")
        await userEvent.click(lifestileTag)

        const motorTag = screen.getByText("motor")
        await userEvent.click(motorTag)

        const workTag = screen.getByText("work")
        await userEvent.click(workTag)
        await userEvent.click(workTag)

        const imgInput = screen.getByLabelText("Sube una foto") as HTMLInputElement
        await userEvent.upload(imgInput,formValues.img)
        expect(imgInput.files).toHaveLength(1)
        expect(imgInput.files?.[0]).toBe(formValues.img)

        const submitButton = screen.getByRole("button")
        await userEvent.click(submitButton)

        expect(actions.advertCreated).toBeCalled()
        expect(mockFormData.append).toHaveBeenCalledWith('name', formValues.product);
        expect(mockFormData.append).toHaveBeenCalledWith('price', formValues.price);
        expect(mockFormData.append).toHaveBeenCalledWith('tags', "lifestile");
        expect(mockFormData.append).toHaveBeenCalledWith('tags', "motor");
        expect(mockFormData.append).toHaveBeenCalledWith('sale', "false");
    })

        test("Test to tags render error", async ()=>{
            const {container} = renderComponent(null,new ApiClientError("Not_found","NOT_FOUND"))        
            const alert = screen.getByRole("alert")
    
            expect(alert).toHaveTextContent("Ha surgido un error al cargar los tags por favor intentelo más tarde")
            expect(container).toMatchSnapshot()     
    
        })

        test("Test to render error", async ()=>{

            const {container} = renderComponent(new ApiClientError("Not_found","NOT_FOUND"))        
            const alert = screen.getByRole("alert")
    
            expect(alert).toHaveTextContent("Ha ocurrido un problema al crear el producto porfavor intentalo más tarde")
            expect(container).toMatchSnapshot()     
    
        })

        test("Test to minText error", async ()=>{
            formValues.product = "aa"
            renderComponent()        
            const nameInput = screen.getByPlaceholderText("Producto")
            await userEvent.type(nameInput,formValues.product)
            expect(nameInput).toHaveValue(formValues.product)

            const alert = screen.getByRole("alert")    
            expect(alert).toHaveTextContent("El producto debe de tener al menos 3 letras")
            const submitButton = screen.getByRole("button")
            await userEvent.click(submitButton)

            expect(actions.advertCreated).not.toBeCalled()
        })

        test("Test to number invalid error", async ()=>{
            formValues.price = "-50"
            renderComponent()        
            const priceInput = screen.getByPlaceholderText("Precio")
            await userEvent.type(priceInput,formValues.price)
            expect(priceInput).toHaveValue(Number(formValues.price))

            const alert = screen.getByRole("alert")    
            expect(alert).toHaveTextContent("El precio no puede ser negativo")
            const submitButton = screen.getByRole("button")
            await userEvent.click(submitButton)

            expect(actions.advertCreated).not.toBeCalled()
        })




})