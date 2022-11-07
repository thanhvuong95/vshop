import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Navigation, User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from './../../../core/services/cart.service';

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
  subscription: Subscription[] = [];
  user: User | null = null;

  constructor(
    private _cartService: CartService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.navList = [
      new Navigation('', 'Home'),
      new Navigation('shop', 'Shop'),
      new Navigation('category', 'Category'),
      new Navigation('about', 'About'),
    ];
  }

  ngOnInit(): void {
    const subCart = this._cartService.carts.subscribe((carts) => {
      const quantity = carts.reduce((total, cart) => total + cart.quantity, 0);
      this.quantity = quantity;
      this.activeAnimated = true;
      setTimeout(() => (this.activeAnimated = false), 1000);
    });
    const subAuth = this._authService.user.subscribe(
      (user) => (this.user = user)
    );

    this.subscription = [...this.subscription, subCart, subAuth];
  }

  ngDoCheck(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  toggleNavigation() {
    this.isOpen = !this.isOpen;
  }

  handleAuth() {
    if (this.user) {
      this.isOpen = false;
      this._authService.logout();
    } else {
      this.toggleNavigation();
      this._router.navigate(['/auth']);
    }
  }
}
