import { AdvertType } from "../../pages/adverts/types";
import { adverts, auth,tags, ui } from "../reducers";

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
     const advert:AdvertType =
        {createdAt:"28/02/2025",
          id:"12/22as-22",
          name:"Test advert",
          photo:"photo/url",
          price:20,
          sale:true,
          tags:["motor"]        
        }
    test( "should manage 'adverts/loaded/fulfilled' action return adverts ", () => {
        const result = adverts(
            {data:[], loaded:false},
            {payload:{data: [advert], loaded: true}, type: 'adverts/loaded/fulfilled',}
        )
        expect(result.data).toHaveLength(1)
        expect(result.data).toEqual([advert])
        expect(result.loaded).toBe(true)
    })

    test( "should manage 'advert/created/fulfilled' action append advert to adverts ", () => {
        const result = adverts(
            {data:[advert], loaded:false},
            {payload:advert, type: 'advert/created/fulfilled'}
        )
        expect(result.data).toHaveLength(2)
        expect(result.data).toEqual([advert,advert])
        expect(result.loaded).toBe(false)
    })

    test( "should manage 'advert/deleted/fulfilled' action delete advert", () => {
        const result = adverts(
            {data:[advert,advert], loaded:false},
            {payload:[advert], type: 'advert/deleted/fulfilled'}
        )
        expect(result.data).toHaveLength(1)
        expect(result.data).toEqual([advert])
        expect(result.loaded).toBe(false)
    })

    test( "should manage other action return state", () => {
    
        const result = adverts(
            {data:[advert,advert], loaded:false},
         {type:'ui/reset-error'}
        )    
        expect(result).toEqual( {data:[advert,advert], loaded:false})
    })
})

describe("tags reducer", () => {
    const tagsArray:string[]= ["motor","informática","gaming","anime"]
   test( "should manage 'tags/loaded/fulfilled' action return tags", () => {
       const result = tags(
        { data: null, loaded: false},
           {payload:tagsArray, type: 'tags/loaded/fulfilled',}
       )
       expect(result.data).toHaveLength(4)
       expect(result.data).toEqual(tagsArray)
       expect(result.loaded).toBe(true)
   })

   test( "should manage 'tags/loaded/rejected' action return error", () => {
    
    const error = new Error("Test Error")
    const result = ui(
     { error: null, pending:false,tagsError:null},
        {payload:error, type: 'tags/loaded/rejected',}
    )
    
    expect(result.tagsError).toEqual(error)
    expect(result.error).toEqual(null)
    expect(result.pending).toBe(false)
})

test( "should manage other action return state", () => {
    
    const result = tags(
     { data: null, loaded: false,},
     {type:'ui/reset-error'}
    )    
    expect(result).toEqual({ data: null, loaded: false})
})


})