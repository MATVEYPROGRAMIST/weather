import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "b9ae7d546a07064f48306417fdd6125c";

class App extends React.Component {

state = {
  temp: undefined,
  city: undefined,
  country: undefined,
  pressure: undefined,
  sunset: undefined,
  error: undefined
}

  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;

    if(city) {
      const api_url = await
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      if(data.cod === '404') {
        this.setState({
          error: 'Вы неверно ввели название города!'
        })
        return;
      }

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunset_date = date.getHours() + ":" + date.getMinutes();

      let pressure = data.main.pressure;
      let pressureInMmHg = Math.floor(pressure * 0.75006);

      this.setState ({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: pressureInMmHg,
        sunset: sunset_date,
        error: undefined
    });
  } else {
    this.setState({
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: "Вы не ввели город!"
    });
  }
}
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
