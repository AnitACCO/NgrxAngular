import { createReducer, on } from "@ngrx/store";
import { setApiStatus } from "./app.action";
import { Appstate } from "./appstate";

export const inItialState:Appstate = {
  apiStatus: '',
  apiResponseMessage: ''
}


export const appReducer = createReducer(
  inItialState,
  on(setApiStatus,(state,{apiStatus}) =>{
    return apiStatus;
  })
)
