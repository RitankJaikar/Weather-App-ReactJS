import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';

export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 41.05,
        humidity: 62,
        temp: 34.05,
        tempMax: 34.05,
        tempMin: 34.05,
        weather: "haze"
    }); //default values
    const [units, setUnits] = useState('metric');   //metric or imperial

    return (
        <div style={{textAlign: "center"}}>
            <h1>Weather APP</h1>
            <SearchBox setWeatherInfo={setWeatherInfo} units={units} setUnits={setUnits} />
            <InfoBox info={weatherInfo} units={units} />
        </div>
    )
}