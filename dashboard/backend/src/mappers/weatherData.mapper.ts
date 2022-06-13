import { WeatherData } from 'dataLayer/entities/weatherData.entity';
import { WeatherDataViewModel } from 'shared/dist/dto';

export const WeatherDataMapper = {
    mapToViewModel(weatherData: WeatherData): WeatherDataViewModel {
        return {
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            timestamp: weatherData.timestamp,
        };
    },
};
