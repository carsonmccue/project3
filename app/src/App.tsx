import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { Button } from "@/components/ui/button";
import Ratings from "@/components/ui/ratings";
import { convertMetersToMiles, getWeatherMessage } from "./lib/utils";
import { YelpResponse, Business, WeatherResponse } from "./types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trees, Leaf } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const App = () => {
	const [allParks, setAllParks] = useState<Business[] | null>(null);
	const [filteredParks, setFilteredParks] = useState<Business[] | null>(null);
	const [weather, setWeather] = useState<WeatherResponse | null>(null);
	const [currentParkIndex, setCurrentParkIndex] = useState<number>(0);
	const [maxDistance, setMaxDistance] = useState<number>(20);
	const [minRating, setMinRating] = useState<number>(3);

	const { coords } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: false,
		},
		userDecisionTimeout: 75000,
	});

	const fetchNearbyParks = async () => {
		try {
			const yelpResponse = await fetch(
				`http://localhost:4000/http://api.yelp.com/v3/businesses/search?latitude=${coords?.latitude}&longitude=${coords?.longitude}&categories=parks&sort_by=best_match&limit=50`,
				{
					headers: {
						Authorization:
							"Bearer vGSKQ_xqocWt7Pjsb3CoqM3FnM0FWQoWqcB6IRWDPF2QZCiPpETA2qOSuGJowtEfKCv5Ao2pBcXOYdcVNISQX5_Y-MAgeRKCiraUgwv-EzquZzveIJxsHwoqdxYmZnYx",
						accept: "application/json",
					},
				}
			);
			const yelpData: YelpResponse = await yelpResponse.json();
			const weatherResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${coords?.latitude}&lon=${coords?.longitude}&appid=746f28491ca056c4762c59bd41b9d735`
			);
			const weatherData: WeatherResponse = await weatherResponse.json();

			console.log(yelpData);
			console.log(weatherData);
			/*const yelpData = {
				businesses: [
					{
						id: "_-ElAkXhs5VlgHTc5Nxz4g",
						alias: "schabarum-regional-park-rowland-heights",
						name: "Schabarum Regional Park",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/EIBpPHVsI8DXUwtAOmINzQ/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/schabarum-regional-park-rowland-heights?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 338,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.4,
						coordinates: {
							latitude: 33.984909,
							longitude: -117.928556,
						},
						transactions: [],
						location: {
							address1: "17250 E Colima Rd",
							address2: "",
							address3: "",
							city: "Rowland Heights",
							zip_code: "91748",
							country: "US",
							state: "CA",
							display_address: [
								"17250 E Colima Rd",
								"Rowland Heights, CA 91748",
							],
						},
						phone: "+16268545560",
						display_phone: "(626) 854-5560",
						distance: 6797.019011858042,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "VvlfZDhk9QfhxpC_zD-Wig",
						alias: "heritage-park-santa-fe-springs",
						name: "Heritage Park",
						image_url:
							"https://s3-media2.fl.yelpcdn.com/bphoto/ouPBBL3rI0mC-SufoAs9Mw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/heritage-park-santa-fe-springs?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 89,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.4,
						coordinates: {
							latitude: 33.9408404,
							longitude: -118.0757623,
						},
						transactions: [],
						location: {
							address1: "12100 Mora Dr",
							address2: "",
							address3: "",
							city: "Santa Fe Springs",
							zip_code: "90670",
							country: "US",
							state: "CA",
							display_address: [
								"12100 Mora Dr",
								"Santa Fe Springs, CA 90670",
							],
						},
						phone: "+15629466476",
						display_phone: "(562) 946-6476",
						distance: 9592.630718488248,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "Y6BHOSEl_biq9sYFGoBadw",
						alias: "hellman-park-whittier",
						name: "Hellman Park",
						image_url:
							"https://s3-media1.fl.yelpcdn.com/bphoto/bpyJ0uCExivcP55bj1YXeg/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/hellman-park-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 253,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
							{
								alias: "hiking",
								title: "Hiking",
							},
						],
						rating: 4.1,
						coordinates: {
							latitude: 33.9918049,
							longitude: -118.0372637,
						},
						transactions: [],
						location: {
							address1: "5700 Greenleaf Ave",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90601",
							country: "US",
							state: "CA",
							display_address: [
								"5700 Greenleaf Ave",
								"Whittier, CA 90601",
							],
						},
						phone: "+15629459003",
						display_phone: "(562) 945-9003",
						distance: 3602.0028231387455,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "ARf0wEOuCS4ZqdGZOdm_qg",
						alias: "south-park-doggie-adventureland-south-bay-gardena-2",
						name: "South Park Doggie Adventureland - SB",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/7EA40qn08SsKAjOcrm8OHg/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/south-park-doggie-adventureland-south-bay-gardena-2?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 153,
						categories: [
							{
								alias: "petboarding",
								title: "Pet Boarding",
							},
							{
								alias: "pet_training",
								title: "Pet Training",
							},
							{
								alias: "dog_parks",
								title: "Dog Parks",
							},
						],
						rating: 4.6,
						coordinates: {
							latitude: 33.85862979061654,
							longitude: -118.2922585,
						},
						transactions: [],
						location: {
							address1: "945 190th St",
							address2: "",
							address3: null,
							city: "Gardena",
							zip_code: "90248",
							country: "US",
							state: "CA",
							display_address: [
								"945 190th St",
								"Gardena, CA 90248",
							],
						},
						phone: "+13107566110",
						display_phone: "(310) 756-6110",
						distance: 31211.71220667854,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "lyePHb3C1ZS-N-8It16LlQ",
						alias: "whittier-narrows-recreation-area-south-el-monte-3",
						name: "Whittier Narrows Recreation Area",
						image_url:
							"https://s3-media4.fl.yelpcdn.com/bphoto/z5gqNIQJmfEHv5WFe0vdtw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/whittier-narrows-recreation-area-south-el-monte-3?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 218,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
							{
								alias: "fishing",
								title: "Fishing",
							},
							{
								alias: "recreation",
								title: "Recreation Centers",
							},
						],
						rating: 4.1,
						coordinates: {
							latitude: 34.035117537158996,
							longitude: -118.05755696104306,
						},
						transactions: [],
						location: {
							address1: "750 S Santa Anita Ave",
							address2: "",
							address3: "",
							city: "South El Monte",
							zip_code: "91733",
							country: "US",
							state: "CA",
							display_address: [
								"750 S Santa Anita Ave",
								"South El Monte, CA 91733",
							],
						},
						phone: "+16265755526",
						display_phone: "(626) 575-5526",
						distance: 6587.01413238326,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "bgOJN3rdZRD3QKOul9AjGw",
						alias: "south-park-doggie-doggieland-la-los-angeles-3",
						name: "South Park Doggie - Doggieland LA",
						image_url:
							"https://s3-media4.fl.yelpcdn.com/bphoto/RfrJyfYlrFjoAyF_0jQ_3A/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/south-park-doggie-doggieland-la-los-angeles-3?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 132,
						categories: [
							{
								alias: "petboarding",
								title: "Pet Boarding",
							},
							{
								alias: "pet_training",
								title: "Pet Training",
							},
							{
								alias: "dog_parks",
								title: "Dog Parks",
							},
						],
						rating: 4.8,
						coordinates: {
							latitude: 34.02755,
							longitude: -118.26898,
						},
						transactions: [],
						location: {
							address1: "147 W 24th St",
							address2: null,
							address3: "",
							city: "Los Angeles",
							zip_code: "90007",
							country: "US",
							state: "CA",
							display_address: [
								"147 W 24th St",
								"Los Angeles, CA 90007",
							],
						},
						phone: "+12136772370",
						display_phone: "(213) 677-2370",
						distance: 24956.82745554608,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "o81sZFm6KcRJw0jrV1kUIg",
						alias: "la-mirada-creek-park-la-mirada",
						name: "La Mirada Creek Park",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/XrKQncGlXDy6X2EylPCgjQ/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/la-mirada-creek-park-la-mirada?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 86,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.4,
						coordinates: {
							latitude: 33.921908,
							longitude: -117.994451,
						},
						transactions: [],
						location: {
							address1: "12021 Santa Gertrudes Ave",
							address2: "",
							address3: "",
							city: "La Mirada",
							zip_code: "90638",
							country: "US",
							state: "CA",
							display_address: [
								"12021 Santa Gertrudes Ave",
								"La Mirada, CA 90638",
							],
						},
						phone: "+15629431911",
						display_phone: "(562) 943-1911",
						distance: 8698.492316543738,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "55KGoypbSqils-48owT0rg",
						alias: "whittier-greenway-trail-whittier",
						name: "Whittier Greenway Trail",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/3NPUAXzm6umQH7tg_KCiTA/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/whittier-greenway-trail-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 65,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.4,
						coordinates: {
							latitude: 33.9803180812069,
							longitude: -118.039710455078,
						},
						transactions: [],
						location: {
							address1: "NW Whittier To Mills Ave",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90609",
							country: "US",
							state: "CA",
							display_address: [
								"NW Whittier To Mills Ave",
								"Whittier, CA 90609",
							],
						},
						phone: "",
						display_phone: "",
						distance: 4265.377402125002,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "PlTgMCN5DnJ0DBGrd4tAbg",
						alias: "parnell-storybook-zoo-whittier",
						name: "Parnell Storybook Zoo",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/_Y7N_vC1O_bn2wpqAlSB3w/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/parnell-storybook-zoo-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 67,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
							{
								alias: "communitycenters",
								title: "Community Centers",
							},
						],
						rating: 4.3,
						coordinates: {
							latitude: 33.9369288,
							longitude: -118.001149,
						},
						transactions: [],
						location: {
							address1: "15390 Lambert Rd",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90604",
							country: "US",
							state: "CA",
							display_address: [
								"15390 Lambert Rd",
								"Whittier, CA 90604",
							],
						},
						phone: "+15625679450",
						display_phone: "(562) 567-9450",
						distance: 7009.8116362427945,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "8GzCXsZf5QRQbMZReNKspQ",
						alias: "murphy-ranch-park-whittier",
						name: "Murphy Ranch Park",
						image_url:
							"https://s3-media1.fl.yelpcdn.com/bphoto/8XLi3lN86V0CNDdfgHwPsQ/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/murphy-ranch-park-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 52,
						categories: [
							{
								alias: "hiking",
								title: "Hiking",
							},
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.5,
						coordinates: {
							latitude: 33.956689,
							longitude: -117.986408,
						},
						transactions: [],
						location: {
							address1: "16200 Las Cumbres Dr",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90603",
							country: "US",
							state: "CA",
							display_address: [
								"16200 Las Cumbres Dr",
								"Whittier, CA 90603",
							],
						},
						phone: "",
						display_phone: "",
						distance: 4976.36381049128,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "1-r04R8Mf3mDhLsiCJwYKQ",
						alias: "whittier-dog-park-whittier",
						name: "Whittier Dog Park",
						image_url:
							"https://s3-media2.fl.yelpcdn.com/bphoto/m9WiW1WomgVhXg7aS9y-BQ/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/whittier-dog-park-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 123,
						categories: [
							{
								alias: "dog_parks",
								title: "Dog Parks",
							},
						],
						rating: 4.1,
						coordinates: {
							latitude: 33.9789831,
							longitude: -118.0463402,
						},
						transactions: [],
						location: {
							address1: "12206 Philadelphia St",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90601",
							country: "US",
							state: "CA",
							display_address: [
								"12206 Philadelphia St",
								"Whittier, CA 90601",
							],
						},
						phone: "+15625679400",
						display_phone: "(562) 567-9400",
						distance: 4918.309117056376,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "JVq3sydUlaH_of5jy89N9Q",
						alias: "pathfinder-community-regional-park-rowland-heights",
						name: "Pathfinder Community Regional Park",
						image_url:
							"https://s3-media2.fl.yelpcdn.com/bphoto/qsg-KT8nEeB9sO4iEadF8Q/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/pathfinder-community-regional-park-rowland-heights?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 66,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4,
						coordinates: {
							latitude: 33.9661445617676,
							longitude: -117.912628173828,
						},
						transactions: [],
						location: {
							address1: "18150 E Pathfinder Rd",
							address2: "",
							address3: "",
							city: "Rowland Heights",
							zip_code: "91748",
							country: "US",
							state: "CA",
							display_address: [
								"18150 E Pathfinder Rd",
								"Rowland Heights, CA 91748",
							],
						},
						phone: "+15626900933",
						display_phone: "(562) 690-0933",
						distance: 8891.928044619504,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "WK4wW8pZwNGnbzchuZwv_w",
						alias: "penn-park-whittier-2",
						name: "Penn Park",
						image_url:
							"https://s3-media4.fl.yelpcdn.com/bphoto/SbwB_JC2abORPDduXbPOPg/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/penn-park-whittier-2?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 24,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.3,
						coordinates: {
							latitude: 33.974586827392,
							longitude: -118.023666498706,
						},
						transactions: [],
						location: {
							address1: "13900 Penn St",
							address2: "",
							address3: null,
							city: "Whittier",
							zip_code: "90602",
							country: "US",
							state: "CA",
							display_address: [
								"13900 Penn St",
								"Whittier, CA 90602",
							],
						},
						phone: "+15625679400",
						display_phone: "(562) 567-9400",
						distance: 3570.2108324077585,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "f4ThyCwg8MMNA5zF8u-vVA",
						alias: "thomas-burton-park-hacienda-heights",
						name: "Thomas Burton Park",
						image_url:
							"https://s3-media4.fl.yelpcdn.com/bphoto/upWPoOY8WprvAtYsjonZHw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/thomas-burton-park-hacienda-heights?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 21,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.8,
						coordinates: {
							latitude: 33.990771,
							longitude: -117.951591,
						},
						transactions: [],
						location: {
							address1: "16490 E Santa Bianca Dr",
							address2: "",
							address3: "",
							city: "Hacienda Heights",
							zip_code: "91745",
							country: "US",
							state: "CA",
							display_address: [
								"16490 E Santa Bianca Dr",
								"Hacienda Heights, CA 91745",
							],
						},
						phone: "",
						display_phone: "",
						distance: 4581.475697257267,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "r30RA7W34Gk5rZcnKSIXvA",
						alias: "la-habra-splash-pad-brio-park-la-habra",
						name: "La Habra Splash Pad : Brio Park",
						image_url:
							"https://s3-media2.fl.yelpcdn.com/bphoto/cdj4_Od08DGgr1eJYO_jtA/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/la-habra-splash-pad-brio-park-la-habra?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 28,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.5,
						coordinates: {
							latitude: 33.92886,
							longitude: -117.94494,
						},
						transactions: [],
						location: {
							address1: "300 S. Euclid St.",
							address2: null,
							address3: "",
							city: "La Habra",
							zip_code: "90631",
							country: "US",
							state: "CA",
							display_address: [
								"300 S. Euclid St.",
								"La Habra, CA 90631",
							],
						},
						phone: "+15623834200",
						display_phone: "(562) 383-4200",
						distance: 9617.246432509588,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "RwuQhvF5iT23nmgcN-WLuA",
						alias: "pio-pico-state-historic-park-whittier",
						name: "Pio Pico State Historic Park",
						image_url:
							"https://s3-media2.fl.yelpcdn.com/bphoto/y35BOzpuiQKkWbReSiZAJQ/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/pio-pico-state-historic-park-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 21,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.5,
						coordinates: {
							latitude: 33.99361636219706,
							longitude: -118.07111244346508,
						},
						transactions: [],
						location: {
							address1: "6003 Pioneer Blvd",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90606",
							country: "US",
							state: "CA",
							display_address: [
								"6003 Pioneer Blvd",
								"Whittier, CA 90606",
							],
						},
						phone: "+15626951217",
						display_phone: "(562) 695-1217",
						distance: 6594.039945111072,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "sRHzLdumldvKymgt6iSQMQ",
						alias: "garvey-paws-rosemead",
						name: "Garvey Paws",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/1AoAX0ixzFuLdeZVuPn-jw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/garvey-paws-rosemead?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 23,
						categories: [
							{
								alias: "dog_parks",
								title: "Dog Parks",
							},
						],
						rating: 4.5,
						coordinates: {
							latitude: 34.06645761206796,
							longitude: -118.09704624340128,
						},
						transactions: [],
						location: {
							address1: "7933 Emerson Pl",
							address2: "",
							address3: null,
							city: "Rosemead",
							zip_code: "91770",
							country: "US",
							state: "CA",
							display_address: [
								"7933 Emerson Pl",
								"Rosemead, CA 91770",
							],
						},
						phone: "+16265692264",
						display_phone: "(626) 569-2264",
						distance: 11600.84820832866,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "7CkkZYhIFXKnrfpySKOd2Q",
						alias: "smith-park-pico-rivera",
						name: "Smith Park",
						image_url:
							"https://s3-media1.fl.yelpcdn.com/bphoto/3Sh9kOyL5YCgwtfobUWeSw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/smith-park-pico-rivera?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 30,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.2,
						coordinates: {
							latitude: 33.9907074674799,
							longitude: -118.08988646304,
						},
						transactions: [],
						location: {
							address1: "6016 Rosemead Blvd",
							address2: "",
							address3: "",
							city: "Pico Rivera",
							zip_code: "90660",
							country: "US",
							state: "CA",
							display_address: [
								"6016 Rosemead Blvd",
								"Pico Rivera, CA 90660",
							],
						},
						phone: "+15629427004",
						display_phone: "(562) 942-7004",
						distance: 8350.779793070145,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "fxYMsmFFptHahMUYT5MEmA",
						alias: "adventure-park-whittier",
						name: "Adventure Park",
						image_url:
							"https://s3-media3.fl.yelpcdn.com/bphoto/zH8OTV0_JtEz58yIY54Cnw/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/adventure-park-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 28,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
						],
						rating: 4.2,
						coordinates: {
							latitude: 33.94228,
							longitude: -118.03608,
						},
						transactions: [],
						location: {
							address1: "10130 S Gunn Ave",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90605",
							country: "US",
							state: "CA",
							display_address: [
								"10130 S Gunn Ave",
								"Whittier, CA 90605",
							],
						},
						phone: "+15626987645",
						display_phone: "(562) 698-7645",
						distance: 7254.2675603567695,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
					{
						id: "FT-3qc3RRjs-Mou2d4U30A",
						alias: "sycamore-canyon-trail-whittier",
						name: "Sycamore Canyon Trail",
						image_url:
							"https://s3-media4.fl.yelpcdn.com/bphoto/TyDKmWMn96k_hsGrdwSPOA/o.jpg",
						is_closed: false,
						url: "https://www.yelp.com/biz/sycamore-canyon-trail-whittier?adjust_creative=UPqfaSvm74664lacwDiVwQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UPqfaSvm74664lacwDiVwQ",
						review_count: 50,
						categories: [
							{
								alias: "parks",
								title: "Parks",
							},
							{
								alias: "hiking",
								title: "Hiking",
							},
						],
						rating: 3.5,
						coordinates: {
							latitude: 34.00381,
							longitude: -118.05482,
						},
						transactions: [],
						location: {
							address1: "5040 Workman Mill Rd",
							address2: "",
							address3: "",
							city: "Whittier",
							zip_code: "90601",
							country: "US",
							state: "CA",
							display_address: [
								"5040 Workman Mill Rd",
								"Whittier, CA 90601",
							],
						},
						phone: "+15629459003",
						display_phone: "(562) 945-9003",
						distance: 5126.994420241251,
						attributes: {
							business_temp_closed: null,
							waitlist_reservation: null,
						},
					},
				],
				total: 122,
				region: {
					center: {
						longitude: -118,
						latitude: 34,
					},
				},
			};
			const weatherData = {
				coord: {
					lon: -0.1257,
					lat: 51.5085,
				},
				weather: [
					{
						id: 802,
						main: "Clouds",
						description: "scattered clouds",
						icon: "03n",
					},
				],
				base: "stations",
				main: {
					temp: 281.32,
					feels_like: 280.01,
					temp_min: 279.89,
					temp_max: 282.59,
					pressure: 1014,
					humidity: 84,
				},
				visibility: 10000,
				wind: {
					speed: 2.24,
					deg: 237,
					gust: 5.36,
				},
				clouds: {
					all: 48,
				},
				dt: 1714339011,
				sys: {
					type: 2,
					id: 2091269,
					country: "GB",
					sunrise: 1714279036,
					sunset: 1714331903,
				},
				timezone: 3600,
				id: 2643743,
				name: "London",
				cod: 200,
			};*/
			setAllParks(yelpData.businesses);
			setWeather(weatherData);
		} catch (err) {
			console.error(err);
		}
	};

	const filterParks = () => {
		if (!allParks) return;
		const filtered = allParks.filter(
			(park) =>
				convertMetersToMiles(park.distance) <= maxDistance &&
				park.rating >= minRating
		);
		setFilteredParks(filtered);
		setCurrentParkIndex(0);
	};

	useEffect(() => {
		if (coords) {
			fetchNearbyParks();
		}
	}, [coords]);

	useEffect(() => {
		filterParks();
	}, [allParks, maxDistance, minRating]);

	const handlePreviousLocation = () => {
		if (filteredParks == null) return;

		setCurrentParkIndex(
			(prevIndex) =>
				(prevIndex - 1 + filteredParks.length) % filteredParks.length
		);
	};

	const handleNextLocation = () => {
		if (filteredParks == null) return;

		setCurrentParkIndex(
			(prevIndex) => (prevIndex + 1) % filteredParks.length
		);
	};

	return (
		<div className="container py-16 mx-auto">
			<div className="flex flex-col md:flex-row gap-4 justify-between pb-4 border-b mb-3">
				<h1 className="text-4xl flex gap-2 items-center font-bold">
					Touch Grass
					<Leaf className="w-8 h-8" />
				</h1>
				<div className="flex gap-2">
					<Button
						onClick={handlePreviousLocation}
						variant="secondary"
						size="lg">
						Previous location
					</Button>
					<Button
						onClick={handleNextLocation}
						variant="default"
						size="lg">
						Next location
					</Button>
				</div>
			</div>

			<div className="border p-4 rounded-md mb-5">
				<h2 className="font-semibold">Filters:</h2>
				<div className="flex gap-10 h-15">
					<div className="w-1/2 space-y-2">
						<p>Max distance: {maxDistance} miles</p>
						<Slider
							value={[maxDistance]}
							min={1}
							max={20}
							step={1}
							onValueChange={(value) => {
								setMaxDistance(value[0]);
							}}
						/>
					</div>
					<div className="w-1/2 space-y-2">
						<p>Min stars: {minRating} stars</p>
						<Slider
							value={[minRating]}
							min={1}
							max={5}
							step={1}
							onValueChange={(value) => {
								setMinRating(value[0]);
							}}
						/>
					</div>
				</div>
			</div>

			{filteredParks == null || weather == null ? (
				<p>Loading...</p>
			) : (
				<>
					{weather != null && (
						<Alert>
							<Trees className="h-4 w-4" />
							<AlertTitle>Let's go!</AlertTitle>
							<AlertDescription>
								{getWeatherMessage(weather?.main.temp)}
							</AlertDescription>
						</Alert>
					)}

					{filteredParks.length > 0 ? (
						<div className="pt-5 gap-5 flex flex-col md:flex-row">
							<div>
								<img
									className="w-full md:max-w-96 h-full object-cover rounded-md"
									src={
										filteredParks[currentParkIndex]
											.image_url
									}
									alt={filteredParks[currentParkIndex].name}
								/>
							</div>
							<Card className="w-full flex flex-col">
								<CardHeader>
									<CardTitle>
										{filteredParks[currentParkIndex].name}
									</CardTitle>
									<CardDescription></CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<p className="flex gap-2">
										{filteredParks[
											currentParkIndex
										].location.display_address.join(", ")}
									</p>
									<p>
										{convertMetersToMiles(
											filteredParks[currentParkIndex]
												.distance
										).toFixed(4)}{" "}
										miles away
									</p>
									<Ratings
										stars={
											filteredParks[currentParkIndex]
												.rating
										}
									/>
								</CardContent>
								<CardFooter className="flex-1 flex-col justify-end">
									<a
										className="text-right text-primary w-full"
										href={
											filteredParks[currentParkIndex].url
										}
										target="_blank">
										Open park on yelp
									</a>
								</CardFooter>
							</Card>
						</div>
					) : (
						<p className="mt-3">No parks found</p>
					)}
				</>
			)}
			<Dialog>
				<DialogTrigger className="text-gray-600 mt-3">
					I can't go outside right now
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>That's unfortunate</DialogTitle>
						<DialogDescription>Next time then!</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default App;
