import React, { useEffect, useState } from "react"
import "./index.css"
import { useAppContext } from "host/store"

const CityCard = ({ cityName }) => {
	const { theme, selectedCity, setSelectedCity, removeCity, fetchWeatherData } =
		useAppContext()
	const [city, setCity] = useState(null)

	useEffect(() => {
		fetchWeatherData(cityName).then(setCity)
	}, [cityName])

	if (city && city.error) return null

	return (
		<div
			onClick={() => {
				setSelectedCity(selectedCity === cityName ? "" : cityName)
			}}
			className={`dashboard_card card_${theme} ${
				selectedCity === cityName ? "card_selected" : ""
			}`}
		>
			{!city && <div>Loading data</div>}
			{city && (
				<>
					<button
						className="close_icon"
						onClick={(e) => {
							e.stopPropagation()
							removeCity(cityName)
						}}
					>
						X
					</button>
					<div className="city_label">{city.location.name}</div>
					<div className="country_label">{city.location.country}</div>
					<div className="weather_details">
						<img
							src={city.current.condition.icon}
							className="weather_img"
							alt="weather_logo"
						/>
						<div>
							<div className="temperature_label">{city.current.temp_c}°C</div>
							<div className="weather_condition_text_label">
								{city.current.condition.text}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

const Dashboard = () => {
	const { theme, cities } = useAppContext()

	return (
		<div className={`weather_container container_${theme}`}>
			<h2 className={`title_${theme}`}>Weather dashboard</h2>
			<div className="cards_container">
				{cities.map((cityName, index) => (
					<CityCard cityName={cityName} key={`city_${cityName}_${index}`} />
				))}
			</div>
		</div>
	)
}

export default Dashboard
