import React, { Component } from "react";
import DetailedInfo from "./DetailedInfo";

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


export default class ForecastTiles extends Component {
 
   
  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  _groupByDays = (data) => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {});
  };

  // Returns week of the day
  _getDayInfo = (data) => {
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };
  
 
  // Fetches the icon using the icon code available in the forecast data.

 _getdes = data => {
   
    if(data[0].weather[0].icon  === "01d") return clearDay;
    if(data[0].weather[0].icon  === "01n") return clearNight;
    if(data[0].weather[0].description  === "cloudy") return cloudy;
    if(data[0].weather[0].icon  === "02d") return fewClouds;
    if(data[0].weather[0].icon  === "02n") return fewCloudsN;
    if(data[0].weather[0].description  === "drizzle rain") return hail;
    if(data[0].weather[0].icon  === "04d") return partlyd;
    if(data[0].weather[0].icon  === "04n") return partlyn;
    if(data[0].weather[0].description  === "rain") return rain;
    if(data[0].weather[0].icon  === "03d") return scatteredClouds;
    if(data[0].weather[0].icon  === "03n") return scatteredCloudsNight;
    if(data[0].weather[0].icon  === "13d") return sleetD;
    if(data[0].weather[0].description  === "Sleet") return Sleet;
    if(data[0].weather[0].description  === "snow") return snow;
    if(data[0].weather[0].description  === "thunderstorm") return thunderstorm;
    if(data[0].weather[0].description  === "tornado") return tornado;
    if(data[0].weather[0].description  === "sand/ dust whirls") return wind;
    if(data[0].weather[0].description  === "fog") return fog;
    return clearDay;
    
   }  
    // console.log(data[0].weather[0].description);
   

  // const url='./icon/console.log'
 
  // console.log(data[0].wind.speed);
date = data => {
  
   var d = data[0].dt_txt;
   d = d.split(' ')[0];
   return d;
   
}


  // Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
  _getInfo = (data, min = [], max = [], humidity = []) => {
    data.map((item) => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
     
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(
      humidity.reduce((curr, next) => curr + next) / humidity.length
    );

    return (
     
      <div className="weather-info">
        <div className="min-max">
          <strong>{`Max temp: ${minMax.max}°C`}</strong> /{" "}
          {`Min temp: ${minMax.min}°C`}
        </div>
        <div className="more-info">{`Avg. Humidity: ${avgHumdity}%`}
        <div>{`wind speed: ${Math.round(data[0].wind.speed*3.6)}km/h`}</div>
        </div>
      </div>
    );
  };

  // Toggles accordion to display hourly weather information
  _showMoreInfo = (index) => {
    const elm = this.refs[`div-${index}`];
    const expandedElment = document.querySelector(".expanded");

    elm.classList.add("expanded");
    expandedElment !== null && expandedElment.classList.remove("expanded");
  };

  render() {
    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));
    
    // Edge case:
    // When the webservice returns data for 6 calendar days during evenings as a result of offset,
    // this ensures that we are showing only 5-days of forecast.
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
    return (
      <div className="forecast-tiles">
       
        {forecastTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={`div-${i}`}
            onClick={() => {
              this._showMoreInfo(i);
            }}
          >
            <div className="primary-info">
              <div className="icon">
                <img className="img" src={this._getdes(item)} />
                {this._getDayInfo(item)}
                <p className="Date">{this.date(item)}</p>
              </div>
              {this._getInfo(item)}
            </div>
            <div className="detailed-info" key={i}>
              <DetailedInfo data={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
// TODO: Add defaultProps and PropType validations
