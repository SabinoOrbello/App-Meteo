import { useState } from "react";
import InputField from "./InputField";
import TodayWeather from "./TodayWeather";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TomorrowForecast from "./TomorrowForecast";
import MyNav from "./MyNav";
import MyFooter from "./myFooter";

const HomeWeather = () => {
	const [locationSearched, setLocationSearched] = useState("");
	const [showCard, setShowCard] = useState(false);
	const [forecast, setForecast] = useState([]);
	const [tomorrowForecast, setTomorrowForecast] = useState();
	const [cityName, setCityName] = useState("");

	const apiKey = "30bd7c341656ea7b619a03db39f7d217";
	const locationAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + locationSearched + "&appid=" + apiKey;
	const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?"; /* lat={lat}&lon={lon}&appid={API key} */

	const fetchLocation = () => {
		fetch(locationAPI)
			.then((r) => {
				if (r.ok) {
					return r.json();
				} else {
					throw new Error("Errore fetch localita'");
				}
			})
			.then((location) => {
				console.log("fetched location", location);
				const lat = location[0].lat;
				const lon = location[0].lon;
				console.log(lon, lat);
				fetchWeather(lat, lon);
			});
	};

	const fetchWeather = (lat, lon) => {
		fetch(weatherAPI + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
			.then((r) => {
				if (r.ok) {
					return r.json();
				} else {
					throw new Error("Errore fetch meteo'");
				}
			})
			.then((weather) => {
				console.log("meteo", weather);
				setForecast(weather);
				setShowCard(true);
				setCityName(weather.city.name);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fetchLocation();
	};

	const setBackground = (weather) => {
		switch (weather) {
			case "Clear":
				return "clearSky";

			case "Clouds":
				return "scatteredClouds text-white";

			case "Rain":
				return "rain";

			case "thunderstorm":
				return "thunderstorm text-white";

			case "Snow":
				return "snow";

			case "Atmosphere":
				return "mist";

			case "Drizzle":
				return "rain";

			default:
				console.log("Unknown weather:", weather);
				break;
		}
	};

	return (
		<BrowserRouter>
			<MyNav />
			<h1 className="display-1 text-primary">Epi-Weather</h1>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<InputField
								setLocationSearched={setLocationSearched}
								locationSearched={locationSearched}
								fetchLocation={fetchLocation}
								setShowCard={setShowCard}
								handleSubmit={handleSubmit}
							/>
							{showCard === false ? (
								<></>
							) : (
								<TodayWeather
									forecast={forecast}
									setTomorrowForecast={setTomorrowForecast}
									tomorrowForecast={tomorrowForecast}
									setBackground={setBackground}
								/>
							)}
						</>
					}
				/>
				<Route
					path="/details/:city"
					element={
						<TomorrowForecast
							tomorrowForecast={tomorrowForecast}
							cityName={cityName}
							forecast={forecast}
							setBackground={setBackground}
						/>
					}
				/>
			</Routes>
			<MyFooter className={showCard ? "" : "fixed-bottom"}></MyFooter>
		</BrowserRouter>
	);
};
export default HomeWeather;
