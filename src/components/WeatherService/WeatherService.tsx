import React, { useState, ChangeEvent, FormEvent } from 'react';
import { getWeatherReport, searchCityAPI } from '../../api/weatherAPI';
import { useAuthContext } from '../../store/auth';
import WeatherReport, {
  CitySuggestionsType,
  WeatherData,
  WeatherReportInfoData,
} from '../WeatherReport/WeatherReport';

export enum OptionsEnum {
  AVERAGE_TEMPERATURE = 'averageTemperature',
  MAX_TEMPERATURE = 'maxTemperature',
  MIN_TEMPERATURE = 'minTemperature',
  AVERAGE_HUMIDITY = 'averageHumidity',
  AVERAGE_WIND_SPEED = 'averageWindSpeed',
  MAX_WIND_SPEED = 'maxWindSpeed',
}

export enum ForecastTimeEnum {
  START_FORECAST_TIME = 'startForecastDateTime',
  END_FORECAST_TIME = 'endForecastDateTime',
  CITY = 'city',
}

export type WeatherDataAPIType = {
  weatherReportData: WeatherData | null;
  weatherReportInfo: WeatherReportInfoData | null;
};

export interface Options {
  [OptionsEnum.AVERAGE_TEMPERATURE]: boolean;
  [OptionsEnum.MAX_TEMPERATURE]: boolean;
  [OptionsEnum.MIN_TEMPERATURE]: boolean;
  [OptionsEnum.AVERAGE_HUMIDITY]: boolean;
  [OptionsEnum.AVERAGE_WIND_SPEED]: boolean;
  [OptionsEnum.MAX_WIND_SPEED]: boolean;
}

const INITIAL_OPTIONS: Options = {
  [OptionsEnum.AVERAGE_TEMPERATURE]: false,
  [OptionsEnum.MAX_TEMPERATURE]: false,
  [OptionsEnum.MIN_TEMPERATURE]: false,
  [OptionsEnum.AVERAGE_HUMIDITY]: false,
  [OptionsEnum.AVERAGE_WIND_SPEED]: false,
  [OptionsEnum.MAX_WIND_SPEED]: false,
};

const WeatherService = () => {
  const {
    state: { authTokens },
  } = useAuthContext();
  const [city, setCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestionsType>(
    []
  );
  const [options, setOptions] = useState<Options>({ ...INITIAL_OPTIONS });
  const [weatherData, setWeatherData] = useState<WeatherDataAPIType>({
    weatherReportData: null,
    weatherReportInfo: null,
  });

  const convertObjectToArrayParams = (obj: Options): OptionsEnum[] => {
    const params: OptionsEnum[] = [];
    for (const key in obj) {
      if (obj[key as OptionsEnum]) {
        params.push(key as OptionsEnum);
      }
    }
    return params;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validate that the city is not empty
    if (!city.trim()) {
      console.log('City is required');

      return;
    }

    // Validate that at least one checkbox is selected
    const isAnyOptionSelected = Object.values(options).some(value => value);
    if (!isAnyOptionSelected) {
      console.log('At least one option must be selected');
      return;
    }

    if (!authTokens) {
      console.log('You must be logged in to generate a weather report');
      return;
    }
    (async () => {
      const result = await getWeatherReport(
        city,
        convertObjectToArrayParams(options),
        authTokens
      );
      const { weatherReportData, weatherReportInfo } = result;
      setWeatherData({ weatherReportData, weatherReportInfo });
      // clean form inputs
      setCity('');
      setOptions({ ...INITIAL_OPTIONS });
    })();
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const name = e.target.name;
    setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
  };

  const handleCityClick = (selectedCity: string) => {
    setCity(selectedCity);
    setCitySuggestions([]); // Clear the suggestions
  };

  const handleCitySearch = async () => {
    if (city.length > 2) {
      if (!authTokens) {
        console.log('You must be logged in to generate a weather report');
        return;
      }
      // or whatever minimum number of characters you want
      const cityResults = await searchCityAPI(city, authTokens); // Replace with your actual API call
      setCitySuggestions(cityResults);
    }
  };

  // Determine whether to disable the "Generate Report" button
  const isButtonDisabled = () => {
    return !city || Object.values(options).every(value => !value);
  };

  return (
    <div className="container mt-4">
      <h1>Weather Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            placeholder={'Enter a city name, for search suggestions'}
            onChange={e => setCity(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={handleCitySearch}>
            Search City
          </button>
        </div>
        {citySuggestions.length > 0 && (
          <div>
            <h6>City Suggestions</h6>
            <ul className="city-suggestions list-group">
              {citySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() => handleCityClick(suggestion['city'])}>
                  {suggestion['city']}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-3">
          {Object.keys(options).map(key => (
            <div className="form-check" key={key}>
              <input
                className="form-check-input"
                type="checkbox"
                id={key}
                name={key}
                checked={options[key as keyof Options]}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={key}>
                {key}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isButtonDisabled()}>
          Generate Report
        </button>
      </form>
      {weatherData?.weatherReportData && weatherData && (
        <WeatherReport weatherData={weatherData} />
      )}
    </div>
  );
};

export default WeatherService;
