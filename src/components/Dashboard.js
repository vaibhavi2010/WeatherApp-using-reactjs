import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/weatherStation";


class Dashboard extends Component {
  
  componentDidMount() {
    setInterval(() => {this._updateCity();}, 300000);
  }

  _updateCity = () => {
    const city = this.__cityInput.value;
    if(city.length !== 0) this.props.dispatch(fetchData(city));
  }
  
  _onkeyPress = e => {
  
    if(e.key === "Enter") {
      this._updateCity();
      // setInterval(this._updateCity(),1000);
    }
  }
  
 

//   window.setInterval(function ()
// {
//     MyMethod();
// }, 300000)

  //  componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  // setInterval(function(){_onkeypress();}, 5000);
  render() {

    const { city, status } = this.props;
    const wrapperClass = (status === "failed") ? "weather-dashboard invalid-city" : "weather-dashboard";

    return (
      <div className={wrapperClass}>
        <header>
          <h1 className="heading">5-Day Weather Forecast</h1>
        </header>
        <section className="controls">
          <div>
            <input
              type="text"
              className="city-input"
              id="city-name"
              ref={input => {
                this.__cityInput = input;
                return this.__cityInput;
              }}
              onKeyPress={this._onkeyPress}
              placeholder={city}
            />
            
            <input
              type="button"
              value="&gt;"
              className="search"
              onClick={this._updateCity}
              id="change-city-btn"
            />
          </div>
        </section>
        <span className="error">Please enter valid city name!</span>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    status: store.weatherStation.status
  }
})(Dashboard)