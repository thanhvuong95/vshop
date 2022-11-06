import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  tab = 0; //0: signIn 1: signUp

  constructor() {}

  ngOnInit(): void {}
}
