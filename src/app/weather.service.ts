import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5919c12c2e6921604c561ab0d27c8ace`;
    return this.http.get<any>(path).pipe(
      map(data => ({
        ...(data as object),
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
      delay(500),
      catchError(this.handleError('Error occured'))
    );
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
       console.error('Status:', error.status); // Example output 'Status: 401'
       return error.status;
    };
 }
}