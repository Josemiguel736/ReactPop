import { RootState } from "..";
import { AdvertType } from "../../pages/adverts/types";
import { getAdvert } from "../selectors";

describe("getAdvert",() => {
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

    const state: RootState = {
        auth:true,
        adverts:{data:adverts,loaded:true},
        tags:{data:tags,loaded:false,error:null},
        ui:{error:null,pending:false}    }


    test("should return a advert with id 1",()=>{
        const result = getAdvert("1")(state)
        expect(result).toBe(adverts[1])
    })

    test("should return a undefined",()=>{
        const result = getAdvert("2")(state)
        expect(result).toBe(undefined)
    })
})