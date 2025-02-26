import {applyMiddleware, combineReducers, createStore} from "redux"
import * as reducers from "./reducers"
import {State} from "./reducers"
import { createBrowserRouter } from "react-router-dom"
import * as auth from "../pages/auth/service"
import * as adverts from "../pages/adverts/service"
import { composeWithDevTools } from "@redux-devtools/extension"
import * as thunk from "redux-thunk"
import { Actions } from "./actions"
import { useDispatch, useSelector } from "react-redux"

type Router = ReturnType<typeof createBrowserRouter>

type Api = {
    auth:typeof auth
    adverts:typeof adverts
}

type ExtraArgument = {
    api:Api
    router:Router
}

export default function configureStore(preloadedState:Partial<State>,router:Router){
    const rootReducer = combineReducers(reducers)
    const store = createStore(
        rootReducer,
        preloadedState as never,
        composeWithDevTools(
            applyMiddleware(thunk.withExtraArgument<State,Actions,ExtraArgument>({api:{auth,adverts},router}))
        )
        
    )
    return store;
}

export type AppStore = ReturnType<typeof configureStore>
export type AppGetState = AppStore["getState"]
export type RootState = ReturnType<AppGetState>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;