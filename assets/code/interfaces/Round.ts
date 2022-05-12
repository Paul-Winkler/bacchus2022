export interface Round {
  round:  number;
  yellow: Wine;
  blue:   Wine;
}

export interface Wine {
  name:      string;
  origin:    string;
  price:     number;
  link:      string;
  img:       string;
  grape:     string;
  region:    string;
  year:      number;
  choosenBy: string[];
}
