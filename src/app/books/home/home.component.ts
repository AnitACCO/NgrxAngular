import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeBooksApi, invokeDeleteBookApi } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private store : Store, private appStore: Store<Appstate>){}

  deleteModal  : any;

  idToDelete: number = 0;
  books$ = this.store.pipe(select(selectBooks));

  ngOnInit() : void{
    this.deleteModal =new window.bootstrap.Modal(document.getElementById("deleteModal"));
    this.store.dispatch(invokeBooksApi())
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.store.dispatch(invokeDeleteBookApi({id: this.idToDelete}));

    let appStatus$ =  this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setApiStatus({apiStatus : { apiStatus : '', apiResponseMessage : ''}}))
        this.deleteModal.hide();
      }
    })
  }
}
