import React, { Component } from "react";
import "./css/weather-icons.min.css";
import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";
import background from "./image/cloudy.jpg";

import WeatherForecast from "./components/WeatherForecast";

class App extends Component {
  // Fetches data by using geolocation. If the user blocks, or if the browser does not support the API,
  // fallsback to default location of London
  constructor(props) {
    super(props);
    this.state = {
    };
  }
   componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log("Position is :", position);
    });

    const detectLocation = new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        const func1 = (position) => {
          resolve(position.coords);
        };
        const func2 = (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("Error detecting location.");
          }
          reject(error);
        };
        navigator.geolocation.getCurrentPosition(func1, func2);
      }
    });

    detectLocation
      .then((location) => {
        this.props.dispatch(fetchData(location));
      })
      .catch(() => {
        this.props.dispatch(fetchData("mumbai"));
      });
  }

  render() {
    const { forecast } = this.props;

    return forecast === null ? (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    ) : (
     
       <div className="wrapper" style={{ backgroundImage: `url(${background})`}}>
        <WeatherForecast data={forecast} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    forecast: store.weatherStation.data,
  };
},null)(App);