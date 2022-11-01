import { CartService } from './../../../core/services/cart.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/core/models';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() openCart: boolean = false;
  @Output() showCart = new EventEmitter();
  navList: Navigation[] = [];
  isOpen = false;
  quantity = 0;
  activeAnimated = false;

  constructor(private _router: Router, private _cartService: CartService) {
    this.navList = [
      new Navigation('', 'Home'),
      new Navigation('shop', 'Shop'),
      new Navigation('category', 'Category'),
      new Navigation('about', 'About'),
    ];
  }

  ngOnInit(): void {
    this._cartService.carts.subscribe((carts) => {
      const quantity = carts.reduce((total, cart) => total + cart.quantity, 0);
      this.quantity = quantity;
      this.activeAnimated = true;
      setTimeout(() => (this.activeAnimated = false), 1000);
    });
  }

  ngDoCheck(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  toggleNavigation() {
    this.isOpen = !this.isOpen;
  }
}
