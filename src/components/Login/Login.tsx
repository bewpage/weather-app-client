import React, { useEffect } from 'react';

const Login = () => {
  const [weather, setWeather] = React.useState<any[]>([]);

  useEffect(() => {
    console.log('Login component mounted');
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/byCity/geneve');
      const data = await response.json();
      setWeather([data]);
    };
    (async () => fetchData())();
  }, []);

  const convertUnixTimestampToDate = (unixTimestamp: number) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return dateObject.toLocaleString();
  };

  return (
    <div>
      <h1>Login</h1>
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
  );
};

export default Login;
