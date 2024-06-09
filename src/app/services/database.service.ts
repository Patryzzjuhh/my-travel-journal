import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_USERS = 'myuserdb';

export interface User {
  id: number;
  name: string;
  password: string;
  active: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private users: WritableSignal<User[]> = signal<User[]>([]);

  constructor() { }

  async initializePlugin(){
    this.db = await this.sqlite.createConnection(
      DB_USERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schema = `CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    password TEXT NOT NULL, 
    active INTEGER DEFAULT 1
    );`;
    
    await this.db.execute(schema);
    this.loadUsers();
    return true;
  }

  getUsers(){
    return this.users;
  }
  //CRUD

  async loadUsers(){
    const users = await this.db.query('SELECT * FROM users;')
    this.users.set(users.values || []);
  }

  async addUser(name:string, password:string){
    const query = `INSERT INTO users (name, password) VALUES ('${name}', '${password}')`;
    const result = await this.db.query(query);

    this.loadUsers();

    return result;
  }

  async updateUserByID(id:string, active:number){
    const query = `UPDATE users SET active=${active} WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadUsers();

    return result;
  }

  async updateUserPassword(id:string, password:string){
    const query = `UPDATE users SET password=${password} WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadUsers();

    return result;
  }

  async deleteUserByID(id:string){
    const query = `DELETE FROM users WHERE id=${id}`;
    const result = await this.db.query(query);

    this.loadUsers();

    return result;
  }
}
