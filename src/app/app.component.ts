import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { DatabaseService, User } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home/', icon: 'mail' },
    { title: 'Login', url: '/login/', icon: 'paper-plane' },
    { title: 'Sign up', url: '/signup/', icon: 'heart' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private database: DatabaseService) {
    this.initApp();
  }

  async initApp(){
    await this.database.initializePlugin();
    SplashScreen.hide();
  }
}
