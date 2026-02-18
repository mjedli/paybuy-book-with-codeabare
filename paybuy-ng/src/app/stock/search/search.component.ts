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

		// Reset si frappe humaine
		if (now - this.lastTime > 120) {
			this.buffer = '';
		}

		// Fin du scan
		if (event.key === 'Enter' || event.code === 'NumpadEnter') {
			event.preventDefault();
			this.searchValueCode = this.buffer;
			this.buffer = '';
			this.getSearchCustomersCode();
			return;
		}

		// Ajout uniquement des caractères imprimables
		if (event.key.length === 1) {
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
		if(this.searchValueCode != "") {
			 this.stockService.setSearchValue(this.searchValueCode);
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
