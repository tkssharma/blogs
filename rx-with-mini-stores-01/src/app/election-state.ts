const CANDIDATES = [
  {name: 'Americano', votes: 5},
  {name: 'Cappuccino', votes: 4},
  {name: 'Espresso', votes: 3},
  {name: 'Macchiato', votes: 2},
  {name: 'Café Latte', votes: 1},
];

export class ElectionState {
  candidates: {name: string, votes: number}[] = CANDIDATES;
}
