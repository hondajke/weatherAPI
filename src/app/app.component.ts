import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map, filter, concatMap, tap, isEmpty } from 'rxjs/operators';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  cities = ["London", "New York", "Moscow", "Karachi"];
  addbutton: string;
  cityControl: FormControl;
  dates$: Observable<any>;

  constructor(private router: Router,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .subscribe(value => {
        this.router.navigate([value]);
      });
  }

  addNewTown() {
    this.weatherService.getWeatherForCity(this.addbutton)
      .subscribe(
        (response) => {
          if (!this.cities.includes(this.addbutton)) {
            this.cities.push(this.addbutton);
          }
        },
        (error) => {
          console.error('error');
        });
  }

  deleteTown(){
    if(this.cities.includes(this.cityControl.value)){
      this.cities.splice(this.cities.indexOf(this.cityControl.value), 1);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
