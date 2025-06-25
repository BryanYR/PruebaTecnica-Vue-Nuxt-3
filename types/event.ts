export type Schedule = {
  time: string;
  days: string[];
}

export type Rating = {
  average: number | null;
}

export type Externals = {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export type Image = {
  medium: string;
  original: string;
}

export type Link = {
  href: string;
}
