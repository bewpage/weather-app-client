import React from 'react';
import {
  ForecastTimeEnum,
  OptionsEnum,
  WeatherDataAPIType,
} from '../WeatherService/WeatherService';
import { formatNumber } from '../../utils/formatNumber';

export type WeatherData = {
  [OptionsEnum.AVERAGE_HUMIDITY]: number | null;
  [OptionsEnum.AVERAGE_TEMPERATURE]: number | null;
  [OptionsEnum.AVERAGE_WIND_SPEED]: number | null;
  [OptionsEnum.MAX_WIND_SPEED]: number | null;
  [OptionsEnum.MAX_TEMPERATURE]: number | null;
  [OptionsEnum.MIN_TEMPERATURE]: number | null;
};

export type WeatherReportInfoData = {
  [ForecastTimeEnum.START_FORECAST_TIME]: string | null;
  [ForecastTimeEnum.END_FORECAST_TIME]: string | null;
  [ForecastTimeEnum.CITY]: string | null;
};

export type CitySuggestionsType = {
  city: string;
  lon: string;
  lat: string;
}[];

interface WeatherReportProps {
  weatherData: WeatherDataAPIType;
}

const WeatherReport = ({ weatherData }: WeatherReportProps) => {
  const labels = {
    [OptionsEnum.AVERAGE_HUMIDITY]: 'Average Humidity',
    [OptionsEnum.AVERAGE_TEMPERATURE]: 'Average Temperature',
    [OptionsEnum.AVERAGE_WIND_SPEED]: 'Average Wind Speed',
    [OptionsEnum.MAX_WIND_SPEED]: 'Max Wind Speed',
    [OptionsEnum.MAX_TEMPERATURE]: 'Max Temperature',
    [OptionsEnum.MIN_TEMPERATURE]: 'Min Temperature',
  };
  const unitsLabels = {
    [OptionsEnum.AVERAGE_HUMIDITY]: '%',
    [OptionsEnum.AVERAGE_TEMPERATURE]: '°C',
    [OptionsEnum.AVERAGE_WIND_SPEED]: 'km/h',
    [OptionsEnum.MAX_WIND_SPEED]: 'km/h',
    [OptionsEnum.MAX_TEMPERATURE]: '°C',
    [OptionsEnum.MIN_TEMPERATURE]: '°C',
  };

  const infoLabels = {
    [ForecastTimeEnum.START_FORECAST_TIME]: 'Start Time',
    [ForecastTimeEnum.END_FORECAST_TIME]: 'End Time',
    [ForecastTimeEnum.CITY]: 'City',
  };

  return (
    <div className="card mt-4" style={{ width: '50rem' }}>
      {weatherData?.weatherReportInfo && (
        <div className="card-header">
          <h6>Forecast Information</h6>
          <ul className="list-unstyled">
            {Object.entries(weatherData.weatherReportInfo).map(
              ([key, value]) => {
                let label = infoLabels[key as ForecastTimeEnum];
                return (
                  <li key={key}>
                    <strong>{label}:</strong> {value}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">Weather Report</h5>
        <h6 className="card-subtitle mb-2 text-muted">Metrics</h6>
        <ul className="list-group list-group-flush">
          {weatherData?.weatherReportData &&
            Object.entries(weatherData.weatherReportData).map(
              ([key, value]) => {
                let label = labels[key as OptionsEnum];
                let unitSymbol = unitsLabels[key as OptionsEnum];
                return (
                  <li className="list-group-item" key={key}>
                    <strong>{label}:</strong> {formatNumber(value)} {unitSymbol}
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </div>
  );
};

export default WeatherReport;
