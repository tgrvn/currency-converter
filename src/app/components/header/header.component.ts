import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public currencyService: CurrencyService) { }

  dollar: any = { name: 'USD' }
  euro: any = { name: 'EUR' }

  ngOnInit(): void {
    this.currencyService.getConverted('UAH', this.dollar.name).subscribe(res => this.dollar.course = +res.toFixed(4))
    this.currencyService.getConverted('UAH', this.euro.name).subscribe(res => this.euro.course = +res.toFixed(4))
  }
}
