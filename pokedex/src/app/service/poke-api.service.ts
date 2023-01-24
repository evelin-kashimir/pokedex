import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=100';
  constructor(private http: HttpClient) { }

  get listAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap( res => {
        res.results.map( (resPokemons: any) => {
          
          this.apiGetPokemons(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );
        });
      })
    )
  }

  //criando um novo atributo de status dentro do indice do obj results
  public apiGetPokemons(url: string): Observable<any>{
    return this.http.get<any>(url).pipe( map(res => res) );
  }
  
}
