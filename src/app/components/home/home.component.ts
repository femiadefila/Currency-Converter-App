import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeRateService } from '../../services/exchange-rate.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 

  converterForm: FormGroup;
  exchangeRates: any = {};
  result: number | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private exchangeRateService: ExchangeRateService
  ) {
    this.converterForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.exchangeRateService.getRates('USD').subscribe(data => {
      this.exchangeRates = data.rates;
    });
  }

  convert(): void {
    const formValue = this.converterForm.value;
    const fromRate = this.exchangeRates[formValue.fromCurrency];
    const toRate = this.exchangeRates[formValue.toCurrency];
    this.result = (formValue.amount * toRate) / fromRate;
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}