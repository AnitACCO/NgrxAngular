import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setApiStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Book } from '../store/book';
import { invokeUpdateBookApi } from '../store/books.action';
import { selectBookById } from '../store/books.selector';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(private store: Store, private route : ActivatedRoute, private router: Router,
    private appStore : Store<Appstate> ) {}

  bookForm: Book = {
    id: 0,
    title: '',
    author: '',
    cost: 0,
  }

  ngOnInit() {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'))
        return this.store.pipe(select(selectBookById(id)))
      })
    )

    fetchFormData$.subscribe((data) =>{
      if(data){
        this.bookForm = {...data}
      }
      else{
        this.router.navigate(['/'])
      }
    })
  }

  update(){
    this.store.dispatch(invokeUpdateBookApi({payload:{...this.bookForm}}));

    let appStatus$ =  this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success'){
        this.appStore.dispatch(setApiStatus({apiStatus : { apiStatus : '', apiResponseMessage : ''}}))
        this.router.navigate(['/']);
      }
    })
  }

}
