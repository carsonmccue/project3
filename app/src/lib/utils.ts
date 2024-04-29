import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertMetersToMiles(meters: number) {
	return meters * 0.000621371;
}

export function getWeatherMessage(temperatureKelvin: number | undefined) {
	if (temperatureKelvin == undefined) return "";
	const temperatureFahrenheit = ((temperatureKelvin - 273.15) * 9) / 5 + 32;
	const roundedTemperature = Math.round(temperatureFahrenheit);
	let weatherMessage =
		"Programmers oftentimes spend a lot of time indoors, but it's important to get some fresh air. ";
	if (roundedTemperature >= 80) {
		weatherMessage += `It's a hot day (${roundedTemperature}°F), but don't let that stop you from enjoying the outdoors!`;
	} else if (roundedTemperature >= 60) {
		weatherMessage += `The weather is a pleasant ${roundedTemperature}°F. It's a great day to spend some time outside!`;
	} else if (roundedTemperature >= 40) {
		weatherMessage += `It's a bit chilly (${roundedTemperature}°F), but a little fresh air never hurt anyone. Go outside and enjoy!`;
	} else {
		weatherMessage += `It's quite cold out there ${roundedTemperature}°F, but don't let that keep you cooped up inside. Bundle up and explore!`;
	}
	weatherMessage +=
		" Check out one of these nearby parks or trails loaded from the yelp api.";
	return weatherMessage;
}
