import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchApiSuccess, deleteBookApiSuccess, saveBookApiSuccess, updateBookApiSuccess } from "./books.action";

export const intialState : ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  intialState,
  on(booksFetchApiSuccess,(state,{ allBooks }) =>{
    return allBooks;
  }),
  on(saveBookApiSuccess,(state,{response}) =>{
    let newState = [...state];
    newState.unshift(response);
    return newState;
  }),
  on(updateBookApiSuccess,(state,{response}) =>{
    let newState = state.filter(_ => _.id != response.id);
    newState.unshift(response);
    return newState;
  }),
  on(deleteBookApiSuccess,(state,{id}) =>{
    let newState = state.filter(_ => _.id != id);
    return newState;
  })
);
