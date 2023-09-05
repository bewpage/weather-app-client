import { baseAPI, options } from './baseAPI';
import { config } from '../config';
import {
  OptionsEnum,
  WeatherDataAPIType,
} from '../components/WeatherService/WeatherService';

const { WEATHER_API_URL } = config;

const getWeatherReport = async (
  city: string,
  selectedFields: OptionsEnum[],
  apiToken: string
): Promise<WeatherDataAPIType> => {
  const baseParams = `city=${city}`;
  const fieldParams = selectedFields
    .map(field => `fields=${encodeURIComponent(field)}`)
    .join('&');
  const fullUrl = `${WEATHER_API_URL}/byCity?${baseParams}&${fieldParams}`;

  return await baseAPI(fullUrl, options({ apiToken }));
};

const searchCityAPI = async (city: string, apiToken: string): Promise<any> => {
  const fullUrl = `${WEATHER_API_URL}/searchCity?city=${city}`;
  return await baseAPI(fullUrl, options({ apiToken }));
};

export { getWeatherReport, searchCityAPI };
