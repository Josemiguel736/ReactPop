import { ExtraArgument } from ".."
import { AdvertType } from "../../pages/adverts/types"
import { Credentials } from "../../pages/auth/types"
import { authLoginPending , advertsLoadedFulfilled, authLogin} from "../actions"
import { ApiClientError } from "../../api/error"

describe("authLoginPending",() => {
    test("should return an 'auth/login/pending' action",() => {
        const action = {
            type: "auth/login/pending"
        }
        const result = authLoginPending()
        expect(result).toEqual(action)
    })
})

describe("advertsLoadedFuilfilled", () => {
    const adverts:AdvertType[] =
    [{createdAt:"28/02/2025",
      id:"12/22as-22",
      name:"Test advert",
      photo:"photo/url",
      price:20,
      sale:true,
      tags:["motor"]        
    }]

    test("should return an 'advertsLoadedFulfilled' action with loaded false ", () => {
        const result = advertsLoadedFulfilled(adverts)
        const action = {
            type: "adverts/loaded/fulfilled",
            payload: {data:adverts, loaded:false}
        }
        expect(result).toEqual(action)
    })

    test("should return an 'advertsLoadedFulfilled' action with loaded true", () =>{
        const result = advertsLoadedFulfilled(adverts,true)
        const action = {
            type: "adverts/loaded/fulfilled",
            payload: {data:adverts, loaded:true}
        }
        expect(result).toEqual(action)

    })
})

describe("authLogin", () => {
    afterEach(() => vi.clearAllMocks())
    const adverts:AdvertType[] =[
        {createdAt:"28/02/2025",
          id:"12/22as-22",
          name:"Test advert",
          photo:"photo/url",
          price:20,
          sale:true,
          tags:["motor"]        
        },
        {createdAt:"29/02/2025",
            id:"1",
            name:"advert to find!!",
            photo:"photo/url",
            price:90,
            sale:true,
            tags:["motor"]        
          },
          {createdAt:"29/02/2025",
            id:"12",
            name:"advert 12",
            photo:"photo/url",
            price:202,
            sale:true,
            tags:["motor"]        
          }]

const tags:string[] = ["motor","lifestile","other tag"]
    const getState = ()=>({
         auth:true,
         adverts:{data:adverts,loaded:true},
        tags:{data:tags,loaded:false,error:null},
         ui:{error:null,pending:false}    })
    

    const credentials:Credentials = {
        email:"admin@example.com",
        password: "1234"
    }
    const thunk = authLogin(credentials,true)
    const dispatch = vi.fn()
    const to = "/to"
    const router = {state:{location:{state:{from:to}}},navigate:vi.fn()}
    const api = {auth:{login:vi.fn()} }
    const extraArgument = {api,router} as unknown as ExtraArgument
    
    test("when login resolves", async ()  =>{
    api.auth.login = vi.fn().mockResolvedValue(undefined)
    await thunk(dispatch, getState ,extraArgument)
    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1,{type:"auth/login/pending"})
    expect(dispatch).toHaveBeenNthCalledWith(2,{type:"auth/login/fulfilled"})
    expect(api.auth.login).toHaveBeenCalledWith(credentials,true)
    expect(router.navigate).toHaveBeenCalledWith(to,{replace:true})
    })

    test("when login rejects", async ()  =>{
        const error = new ApiClientError("Unauthorized","UNAUTHORIZED")
        api.auth.login = vi.fn().mockRejectedValue(error)

        await thunk(dispatch, getState ,extraArgument)
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toHaveBeenNthCalledWith(1,{type:"auth/login/pending"})
        expect(dispatch).toHaveBeenNthCalledWith(2,{type:"auth/login/rejected",payload:error})
        expect(router.navigate).not.toHaveBeenCalled()


    })    
    })