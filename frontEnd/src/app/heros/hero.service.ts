import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

import { HEROES } from './mock-heros'
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service'



@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private herosUrl = 'http://localhost:5000/api/Hero';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private heros: Hero[];

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.herosUrl}/${id}`;
    this.messageService.add(`Hero Service: fetched hero id=${id}`)
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  getHeros(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.herosUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getheros', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`Hero Service: ${message}`)
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put(this.herosUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>("updateHero"))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.herosUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  delete(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  serachHeros(term: string): Observable<Hero[]> {
    if (!term.trim) {
      // empty search term return empty array 
      return of([])
    }

    return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeros', []))
    );
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
