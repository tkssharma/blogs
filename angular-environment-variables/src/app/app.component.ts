import { Component } from '@angular/core';
import { EnvService } from 'src/app/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public env: EnvService
  ) {
  }
}
