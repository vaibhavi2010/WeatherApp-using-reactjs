import React from "react";

import fewCloudsN from "../icon/few clouds night.png";
import clearDay from "../icon/clear-day.svg";
import partlyd from "../icon/partly-cloudy-day.svg";
import clearNight from "../icon/clear-night.svg";
import cloudy from "../icon/cloudy.svg";
import fewClouds from "../icon/few clouds.svg";
import hail from "../icon/hail.svg";
import partlyn from "../icon/partly-cloudy-night.svg";
import rain from "../icon/rain.svg";
import scatteredClouds from "../icon/scattered clouds.svg";
import scatteredCloudsNight from "../icon/scattered clouds night.png";
import Sleet from "../icon/Sleet.svg";
import sleetD from "../icon/sleet day.png";
import snow from "../icon/snow.svg";
import thunderstorm from "../icon/thunderstorm.svg";
import tornado from "../icon/tornado.svg";
import wind from "../icon/wind.svg";
import fog from "../icon/fog.svg";


const DetailedInfo = ({ data }) => {

  const getHour = time => time ? new Date(time).getHours() : new Date().getHours();
  const getDate = date => date ? new Date(date).getDate() : new Date().getDate();
  const getdes = data => {
    if(data.weather[0].icon  === "01d") return clearDay;
    if(data.weather[0].icon  === "01n") return clearNight;
    if(data.weather[0].description  === "cloudy") return cloudy;
    if(data.weather[0].icon  === "02n") return fewClouds;
    if(data.weather[0].icon  === "02d") return fewCloudsN;
    if(data.weather[0].description  === "drizzle rain") return hail;
    if(data.weather[0].icon  === "04d") return partlyd;
    if(data.weather[0].icon  === "04n") return partlyn;
    if(data.weather[0].description  === "rain") return rain;
    if(data.weather[0].icon  === "03d") return scatteredClouds;
    if(data.weather[0].icon  === "03n") return scatteredCloudsNight;
    if(data.weather[0].icon  === "13d") return sleetD;
    if(data.weather[0].description  === "Sleet") return Sleet;
    if(data.weather[0].description  === "snow") return snow;
    if(data.weather[0].description  === "thunderstorm") return thunderstorm;
    if(data.weather[0].description  === "tornado") return tornado;
    if(data.weather[0].description  === "sand/ dust whirls") return wind;
    if(data.weather[0].description  === "fog") return fog;
    return clearDay;
   }  
 
  const displayMoreInfo = (item, i) => {
    return (
      <div className="hourly-info" key={i}>
    
        <img className="img-icon" src={getdes(item)} />
        <div className="hour-temperature">
          {`${Math.round(item.main.temp)}°C`}
        </div>
        <div className="hour-of-the-day">
          {`${getHour(item.dt * 1000)}:00`}
      
        </div>
      </div>
    );
  };

  return (
    <div className="hourly">
      {data.map((item, i) => (
        
        (getHour(item.dt * 1000) > getHour() && getDate(item.dt * 1000) === getDate()) ? (
          displayMoreInfo(item, i)
         ) : getHour(item.dt * 1000) >= 5 && getHour(item.dt * 1000) <= 23 ? (
            displayMoreInfo(item, i)
         ) : null
      ))}
    </div>
  );
};

export default DetailedInfo;
