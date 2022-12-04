import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private ALL_CURINCES = 'https://currency-exchange.p.rapidapi.com/listquotes'
  private CONVERT = 'https://currency-exchange.p.rapidapi.com/exchange'
  private KEY = 'c9c058e224msh1fe1c40ffcc122fp12b072jsnc0cfa1be2eb1'
  private HOST = 'currency-exchange.p.rapidapi.com'

  constructor(private http: HttpClient) { }

  currencies: string[] = []

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(this.ALL_CURINCES, {
      headers: {
        "X-RapidAPI-Key": this.KEY,
        "X-RapidAPI-Host": this.HOST
      }
    }).pipe(
      tap((response) => {
        response.splice(response.findIndex((cur) => cur === 'RUB'), 1, 'UAH')
        this.currencies = response
      })
    )
  }

  getConverted(from: string, to: string) {
    return this.http.get<number>(this.CONVERT, {
      params: { from, to },
      headers: {
        "X-RapidAPI-Key": this.KEY,
        "X-RapidAPI-Host": this.HOST
      }
    })
  }
}
