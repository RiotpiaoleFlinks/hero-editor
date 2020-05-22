import { Component, OnInit } from '@angular/core';
import { Hero} from '../heros/hero'
import { HeroService } from '../heros/hero.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heros: Hero[] = []
  selectedHero: Hero;
  constructor(private heroService : HeroService) {
  }


  ngOnInit(): void {
    this.getHeros()
  }

  getHeros():void { 
    this.heroService.getHeros()
      .subscribe(
        heros => this.heros = heros.slice(1,5))
  }

}
