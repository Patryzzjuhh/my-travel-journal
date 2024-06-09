import { Component, OnInit } from '@angular/core';
import { DatabaseService, User } from '../services/database.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  users = this.database.getUsers();
  newUserName = '';
  newUserPassword = '';

  constructor(private database: DatabaseService) { }

  async createUser(){
    await this.database.addUser(this.newUserName,this.newUserPassword);
    this.newUserPassword= '';
  }

  ngOnInit() {
  }

}
