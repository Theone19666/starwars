export interface Person {
	birth_year: string;
	created: string;
	edited: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}

export interface PeopleRequestResult {
	count?: number;
	next?: string;
	previous?: string;
	results?: Person[];
	detail?: string;
}

export interface Starship {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	pilots: string[];
	films: string[];
	created: string;
	edited: string;
	url: string;
}

export interface BaseState {
	starships: Starship[];
}

export interface IObject {
	[key: string]: any;
}
