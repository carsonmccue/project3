export interface YelpResponse {
	businesses: Business[];
	total: number;
	region: Region;
}

export interface Business {
	id: string;
	alias: string;
	name: string;
	image_url: string;
	is_closed: boolean;
	url: string;
	review_count: number;
	categories: Category[];
	rating: number;
	coordinates: Coordinates;
	transactions: string[];
	price?: string;
	location: Location;
	phone: string;
	display_phone: string;
	distance: number;
	attributes: any;
}

export interface Category {
	alias: string;
	title: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Location {
	address1: string | null;
	address2?: string | null;
	address3?: string | null;
	city: string;
	zip_code: string;
	country: string;
	state: string;
	display_address: string[];
}

export interface Region {
	center: Center;
}

export interface Center {
	longitude: number;
	latitude: number;
}

export interface WeatherResponse {
	coord: Coord;
	weather: Weather[];
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface Coord {
	lon: number;
	lat: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

export interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

export interface Clouds {
	all: number;
}

export interface Sys {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}
