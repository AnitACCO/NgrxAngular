import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksApi = createAction(
  "[Books API] invoke books fetch Api"
)

export const booksFetchApiSuccess = createAction(
  "[Books API]  books fetch Api Success",
  props<{allBooks : Book[]}>()
)

export const invokeSaveBookApi = createAction(
  "[Books API] invoke save book API",
  props<{payload : Book}>()
)

export const saveBookApiSuccess = createAction(
  "[Books API] save book Api success",
  props<{response : Book}>()
)

export const invokeUpdateBookApi = createAction(
  "[Books API] invoke update book API",
  props<{payload : Book}>()
)

export const updateBookApiSuccess = createAction(
  "[Books API] update book Api success",
  props<{response : Book}>()
)

export const invokeDeleteBookApi = createAction(
  "[Books API] invoke delete book API",
  props<{id : number }>()
)

export const deleteBookApiSuccess = createAction(
  "[Books API] delete book Api success",
  props<{ id : number }>()
)
