import { Component } from '@angular/core';
import { ElectionStore } from './election.store';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  providers: [ElectionStore]
})
export class ElectionComponent {
  constructor (private store: ElectionStore) {}
}
