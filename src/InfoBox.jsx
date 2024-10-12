import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import "./InfoBox.css";

export default function InfoBox({info, units}) {
    //Free images from Unsplash
    const defaultImg = "https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const HOT_URL = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bW1lcnxlbnwwfHwwfHx8MA%3D%3D";
    const COLD_URL = "https://images.unsplash.com/photo-1550077404-c00d89693129?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const Rain_URL = "https://images.unsplash.com/photo-1511634829096-045a111727eb?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // Choose the correct unit symbol based on the units prop
    const unitSymbol = units === 'metric' ? '°C' : '°F';

    return (
        <div className="InfoBox">
            <h3>Weather Info</h3>
            <Card sx={{ maxWidth: 345 }} className='card'>
                {   info ? (
                        <div>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={info.humidity >80 ? Rain_URL : info.temp > 15 ? HOT_URL : COLD_URL}
                                title="weather image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {info.city} {info.humidity >80 ? <ThunderstormIcon /> : info.temp > 15 ? <WbSunnyIcon /> : <AcUnitIcon /> }
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"div"}>
                                    <p>Temprature: {info.temp}{unitSymbol}</p>
                                    <p>Humidity: {info.humidity}</p>
                                    <p>Min Temprature: {info.tempMin}{unitSymbol}</p>
                                    <p>Max Temprature: {info.tempMax}{unitSymbol}</p>
                                    <p>The Weather can be described as <i>{info.weather}</i> and feels like {info.feelsLike}{unitSymbol}.</p>
                                </Typography>
                            </CardContent>
                        </div>
                    )  : (
                        <div>
                             <CardMedia
                                sx={{ height: 140 }}
                                image={defaultImg}
                                title="weather image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" color='red'>
                                    Oops!!
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"div"}>
                                    No city found!
                                </Typography>
                            </CardContent>
                        </div>
                    )
                }
            </Card>
        </div>
    );
}