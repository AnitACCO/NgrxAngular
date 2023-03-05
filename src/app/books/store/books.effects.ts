import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { setApiStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from "../books.service";
import { booksFetchApiSuccess, deleteBookApiSuccess, invokeBooksApi, invokeDeleteBookApi, invokeSaveBookApi, invokeUpdateBookApi, saveBookApiSuccess, updateBookApiSuccess } from "./books.action";
import { selectBooks } from "./books.selector";

@Injectable()
export class BooksEffects {

  constructor(private actions$  : Actions, private bookService : BooksService,
    private appStore : Store<Appstate>,private store: Store) {}

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksApi),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      switchMap(([,booksFromStore]) => {
        if(booksFromStore.length > 0) {
          return EMPTY;
        }

        return this.bookService
          .get()
          .pipe(map((data) =>booksFetchApiSuccess({allBooks : data})));
      })
    )
  )

  saveNewBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(invokeSaveBookApi),
        switchMap((action) => {
          this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: ''}}))
          return this.bookService.create(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: 'success'}}))
            return saveBookApiSuccess({  response : data})}));
        })
      )
    );

    updateBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(invokeUpdateBookApi),
        switchMap((action) => {
          this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: ''}}))
          return this.bookService.update(action.payload)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: 'success'}}))
            return updateBookApiSuccess({  response : data})}));
        })
      )
    )

    deleteBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(invokeDeleteBookApi),
        switchMap((action) => {
          this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: ''}}))
          return this.bookService.delete(action.id)
          .pipe(map((data) => {
            this.appStore.dispatch(setApiStatus({apiStatus:{apiResponseMessage: '',apiStatus: 'success'}}))
            return deleteBookApiSuccess({  id : action.id})}));
        })
      )
    )
}
