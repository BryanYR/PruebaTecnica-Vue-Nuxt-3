import type { Link, Schedule, Rating, Externals, Image} from "../types/event";

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

export interface Channel {
  id: number;
  name: string;
  country: Country;
  officialSite?: string | null;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface ShowLinks {
  self: Link;
  previousepisode?: EpisodeLink;
}

export interface EpisodeLink extends Link {
  name?: string;
}

export interface Show {
  id: number | null;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating | null;
  weight: number;
  network: Network | null;
  webChannel: Channel | null;
  dvdCountry: Country | null;
  externals: Externals;
  image: Image | null;
  summary: string;
  updated: number;
  _links: ShowLinks;
}