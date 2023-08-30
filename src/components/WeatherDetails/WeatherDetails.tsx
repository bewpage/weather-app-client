import React, { useEffect } from 'react';

const WeatherDetails = () => {
  const [weather, setWeather] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/byCity/geneve', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjkzMzkyOTY3LCJleHAiOjE2OTQyNTY5Njd9.ct269qW0ecktte1WZQr6PiF5h1Ow7IiCDovQwT2IUnxyZYNdlTFIWW_ON3vFE_kB9Jl7ShU4UWUx1jGDCYrg9g',
        },
      });
      const data = await response.json();
      setWeather([data]);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('Login component mounted');
    (async () => fetchData())();
  }, []);

  const convertUnixTimestampToDate = (unixTimestamp: number) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h1>Weather Details</h1>
          <p>Weather App Client.</p>
          <ul>
            {weather.length > 0 &&
              weather.map((item: any) => {
                const { main, dt } = item;
                return (
                  <li key={main.temp}>
                    <p>Time: {convertUnixTimestampToDate(dt)}</p>
                    <p>Temp: {main.temp} &#8451;</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
