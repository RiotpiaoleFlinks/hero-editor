import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero';
import { HEROES } from './mock-heros';
import { HeroService } from './hero.service'
import { MessageService } from '../messages/message.service'

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  selectedHero: Hero;
  heros: Hero[] = HEROES

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ){}

  getHeroes(): void {
    this.heroService.getHeros()
      .subscribe(
        heros => this.heros = heros
      );
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heros.push(hero);
      });
  }
}