import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import "./SearchBox.css"

export default function SearchBox({setWeatherInfo}) {
    let [city, setCity] = useState("Delhi");
    // let apiKey = "1031e82180981b48e6b9fba105594774";
    let apiKey = "fa8b6b96a01db77ae3d253c0e1c9b50a";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    function handleChange(event) {
        setCity(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(city);
        // setCity("");
        getWeatherInfo();
    }

    async function getWeatherInfo() {
        try {
            let res = await fetch(URL);
            let resJson = await res.json();
            let result = {
                city: city,
                temp: resJson.main.temp,
                tempMax: resJson.main.temp_max,
                tempMin: resJson.main.temp_min,
                humidity: resJson.main.humidity,
                feelsLike: resJson.main.feels_like,
                weather: resJson.weather[0].description
            };
            console.log(result);
            setWeatherInfo(result);
        }
        catch (err) {
            console.log(err);
            setWeatherInfo(null);
        }
    }

    useEffect(() => {
        getWeatherInfo();
        setCity("");
    } , []);

    return (
        <div className='SearchBox'>
            <h3>Search For Weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField required id="city" label="City Name" variant="outlined" onChange={handleChange} value={city}/>
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
            </form>
        </div>
    );
}