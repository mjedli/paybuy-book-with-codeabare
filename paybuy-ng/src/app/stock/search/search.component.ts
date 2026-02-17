import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../service.component';
import { Product } from '../model/product';

@Component({
  selector: 'app-searchproduct',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
})
export class SearchProductComponent implements OnInit {

	constructor(public stockService:StockService, public router : Router) { }
	
	searchValue:string="";
	
	list:Product[] = [];
	
	ngOnInit() {
  		this.getSearchCustomers();
  	}
	

	// start code a barre
	searchValueCode = '';
	private buffer = '';
	private lastTime = 0;

	@HostListener('document:keydown', ['$event'])
	handleKey(event: KeyboardEvent) {
		const now = Date.now();

		// Si délai trop long, on suppose que c’est un humain, on reset
		if (now - this.lastTime > 50) {
		this.buffer = '';
		}

		if (event.key === 'Enter') {
		this.searchValueCode = this.buffer;
		this.buffer = '';
		this.getSearchCustomersCode();
		} else {
		this.buffer += event.key;
		}

		this.lastTime = now;
	}

	// end code a bare

  	getSearchCustomers() {
		if(this.searchValue != "") {
			 this.stockService.setSearchValue(this.searchValue);
		   	 this.stockService.getSearchProduct().subscribe({
		        next: data => {
		            this.list = data;
		        },
		        error: error => {
		            console.error('There was an error!', error);
		            this.router.navigateByUrl("stock/error");
		        }
			});
		}
 	}

	getSearchCustomersCode() {
		if(this.searchValue != "") {
			 this.stockService.setSearchValue(this.searchValue);
		   	 this.stockService.getSearchProductCode().subscribe({
		        next: data => {
		            this.list = data;
		        },
		        error: error => {
		            console.error('There was an error!', error);
		            this.router.navigateByUrl("stock/error");
		        }
			});
		}
 	}

}
