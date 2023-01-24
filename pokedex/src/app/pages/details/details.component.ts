import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(
    private router: ActivatedRoute,
    private pokeService: PokeApiService
    ) { }

  ngOnInit(): void {
    this.pokemon;
  }

  get pokemon() {
    const id = this.router.snapshot.params['id'];
    const pokemon = this.pokeService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeService.apiGetPokemons(`${this.urlName}/${id}`);

    //carrega duas apis ao mesmo tempo e faz a junção das duas;
    return forkJoin([pokemon, name]).subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
