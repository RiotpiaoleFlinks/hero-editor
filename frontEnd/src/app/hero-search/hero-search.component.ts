import { Component, OnInit } from '@angular/core';
import { HeroService} from '../heros/hero.service'
import { Hero } from '../heros/hero'
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heros$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private heroService: HeroService) {}

  search(term : string){ 
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heros$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.serachHeros(term)),
    )
  }

}
