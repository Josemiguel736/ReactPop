import { AdvertType } from "../../pages/adverts/types";
import { adverts, auth } from "../reducers";

describe("auth reducer", () => {
    test( "should manage 'auth/login/fulfilled' action return true ", () => {
        const result = auth(undefined,{type:'auth/login/fulfilled'})
        expect(result).toBe(true)
    })

    test( "should manage 'auth/logout' action return false ", () => {
        const result = auth(true,{type:'auth/logout'})
        expect(result).toBe(false)
    })

    test( "should manage other action return state ", () => {
        const result = auth(true,{type:'ui/reset-error'})
        expect(result).toBe(true)
    })
})


describe("adverts reducer", () => {
     const advert:AdvertType[] =[
        {createdAt:"28/02/2025",
          id:"12/22as-22",
          name:"Test advert",
          photo:"photo/url",
          price:20,
          sale:true,
          tags:["motor"]        
        }]
    test( "should manage 'adverts/loaded/fulfilled' action return adverts ", () => {
        const result = adverts(
            {data:[], loaded:false},
            {payload:{data: advert, loaded: true}, type: 'adverts/loaded/fulfilled',}
        )
        expect(result.data).toHaveLength(1)
        expect(result.data).toEqual(advert)
        expect(result.loaded).toBe(true)
    })


})