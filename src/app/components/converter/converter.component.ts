import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  constructor(public currencyService: CurrencyService) { }

  from: string = 'UAH'
  to: string = 'USD'

  first: number = 1
  second: number = 0

  onSelection() {
    if (this.from === this.to) {
      this.second = this.first
    }

    this.currencyService.getConverted(this.from, this.to).subscribe((res) => {
      this.second = this.calculate(this.first, res)
    })
  }

  onInput($event: any, type: string) {
    $event.target.value = this.validate($event.target.value)

    if (this.from === this.to) {
      this.second = this.first
    }

    switch (type) {
      case 'first':
        this.first = $event.target.value

        this.currencyService.getConverted(this.from, this.to).subscribe((res) => {
          this.second = this.calculate(this.first, res)
        })
        break;

      case 'second':
        this.second = $event.target.value

        this.currencyService.getConverted(this.to, this.from).subscribe((res) => {
          this.first = this.calculate(this.second, res)
        })
        break;
    }
  }

  calculate(quantity: number, course: number) {
    return +(quantity * course).toFixed(6)
  }

  validate(str: string) {
    const pattern = /^([1-9]{1}[0-9]{0,}(\.[0-9]{0,})?|0(\.[0-9]{0,})?|\.[0-9]{1,})$/

    if (!pattern.test(str)) {
      return str.slice(0, -1)
    } else {
      return str;
    }
  }

  ngOnInit(): void {
    this.currencyService.getConverted(this.from, this.to).subscribe((res) => {
      this.second = this.calculate(this.first, res)
    })
  }
}
