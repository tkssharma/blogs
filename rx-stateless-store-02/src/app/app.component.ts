import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  user$ = this.usersService.user$;
  userWithPost$ = this.usersService.userWithPost$;
  selectedUser$ = this.usersService.selectedUser$;
  
  constructor(private usersService: UsersService) {}

  selectUser(id) {
    this.usersService.changeSelectedUser(id);
  }
}
