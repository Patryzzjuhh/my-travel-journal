import { Component, OnInit } from '@angular/core';
import { DatabaseService, User } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users = this.database.getUsers();
  updateUserPassword = '';

  constructor(private database: DatabaseService) { }

  updateUserActive(user:User){
    const active = user.active ? 1 : 0;
    this.database.updateUserByID(user.id.toString(), active);
  }

  async updateUserPasword(user:User){
    await this.database.updateUserPassword(user.id.toString(),this.updateUserPassword);
    this.updateUserPassword= '';
  }

  deleteUser (user:User){
    this.database.deleteUserByID(user.id.toString());
  }

  ngOnInit() {
  }

}
