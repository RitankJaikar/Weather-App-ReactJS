import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import "./SearchBox.css"
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
}));

export default function SearchBox({setWeatherInfo, units, setUnits}) {
    const [city, setCity] = useState("Delhi");
    const [searchedCity, setSearchedCity] = useState("Delhi");
    // const [units, setUnits] = useState('metric');
    // const apiKey = "1031e82180981b48e6b9fba105594774";
    const apiKey = "fa8b6b96a01db77ae3d253c0e1c9b50a";

    // Update the weather info based on the last searched city and the selected unit
    function handleUnitChange(event) {
        setUnits(prevUnits => (prevUnits === 'metric' ? 'imperial' : 'metric'));
    }
    // console.log(units);

    // Update the current city typed by the user
    function handleChange(event) {
        setCity(event.target.value);
    }

    // On search, update the weather for the typed city
    function handleSubmit(event) {
        event.preventDefault();
        // console.log(city);
        // setCity("");
        setSearchedCity(city);  // Save the searched city
        getWeatherInfo(city, units);
    }

    async function getWeatherInfo(city, units) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
            // console.log(result);
            setWeatherInfo(result);
        }
        catch (err) {
            console.log(err);
            setWeatherInfo(null);
            setSearchedCity(null);
        }
    }

    // Update weather info when the units are changed, but for the last searched city
    useEffect(() => {
        // console.log(searchedCity);
        if (searchedCity) {
            getWeatherInfo(searchedCity, units);
        }
        // setCity("");
    } , [units]);   // Update only when units change

    return (
        <div className='SearchBox'>
            <h3>Search For Weather</h3>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Typography>&deg;F</Typography>
                    <AntSwitch inputProps={{ 'aria-label': 'ant design' }} onChange={handleUnitChange} checked={units === 'metric' ? true : false } />
                    <Typography sx={{marginLeft: '8px !important'}}>&deg;C</Typography>
                </Stack>
                <TextField required id="city" label="City Name" variant="outlined" onChange={handleChange} value={city}/>
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
            </form>
        </div>
    );
}