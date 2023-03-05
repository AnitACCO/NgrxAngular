import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Book } from '../store/book';
import { invokeSaveBookApi } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor( private store : Store, private appStore: Store<Appstate>, private router : Router) {}

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  }

  save(){
    this.store.dispatch(invokeSaveBookApi({payload : {...this.bookForm}}));
    let appStatus$ =  this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setApiStatus({apiStatus : { apiStatus : '', apiResponseMessage : ''}}))
        this.router.navigate(['/']);
      }
    })
  }
}
