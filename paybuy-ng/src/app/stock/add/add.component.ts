import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../service.component';
import { ProviderService } from '../../provider/service.component';
import { Product } from '../model/product';
import { Provider } from '../../provider/model/provider';

@Component({
  selector: 'app-addproduct',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css'],
})
export class AddProductComponent implements OnInit {

	constructor(public stockService:StockService, public providerService:ProviderService,
				public router : Router,  private route: ActivatedRoute) { }

	product:Product = {} as Product;
	
	provider:Provider = {} as Provider;
	
	private routeSub: Subscription;

	// start code a barre
	
	private buffer = '';
	private lastTime = 0;

	@HostListener('document:keydown', ['$event'])
	handleKey(event: KeyboardEvent) {
	const now = Date.now();

	// Si délai trop long, on suppose que c’est un humain → reset
	if (now - this.lastTime > 50) {
		this.buffer = '';
	}

	// Empêcher Enter de soumettre le formulaire
	if (event.key === 'Enter') {
		event.preventDefault(); // ← empêche la validation du formulaire
		this.product.codebare = this.buffer;
		this.buffer = '';
	} else {
		this.buffer += event.key;
	}

	this.lastTime = now;
	}


	// end code a bare

	ngOnInit() {
		
		this.routeSub = this.route.params.subscribe(params => {
    		this.stockService.setCurrentIdSelected(params['idproduct']);
    		this.providerService.setCurrentIdSelected(params['idprovider']);
    		this.product.idProvider=params['idprovider'];
  		});
		
  		this.getProviderById();
  	}
	
	getProviderById() {
		this.providerService.getProviderByCurrentId().subscribe({
	        next: data => {
				this.provider = data;
	        },
	        error: error => {
	            console.error('There was an error!', error);
	            this.router.navigateByUrl("stock/product/error");
	        }
	     });
	}
	
  	addProduct() {
		if(this.product.name != '') {
			this.stockService.addProduct(this.product).subscribe({
		        next: data => {
					this.router.navigateByUrl("stock/product/success");
		            //this.postId = data.id;
		        },
		        error: error => {
		            console.error('There was an error!', error);
		            this.router.navigateByUrl("stock/product/error");
		        }
	      });
		}
		
 	}

}
