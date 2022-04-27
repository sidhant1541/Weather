import React from 'react'
import {useState} from 'react'

const api ={

    key: "fad44fb39efb436f8ad2da78bffd9584",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App () {

    const [query, setQuery] = useState(' ');
    const [weather , setWeather] = useState({});

    const search = evt =>{
        if(evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result =>{
                setWeather(result)
                setQuery(' ')
                console.log(result)
            })
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()]; //returns a number from above array called Days
        let date = d.getDate(); //gives us our date
        let month = months[d.getMonth()];//
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}` //returns a template string in format DD/MM/YY
      }

    return (//we're checking for the type of weather
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)} // gets the value of the input tag 
            value={query} // assigns the query value to the query
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? ( //undefined value means if we havent made a search query
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;