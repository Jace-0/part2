import axios from 'axios'

const baseUrl = 'http://localhost:3005/countries'
const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY

console.log(weatherAPIKey)

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
// set "VITE_WEATHER_API_KEY=your_actual_api_key_here" && npm run dev
const fetchWeather = country => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${weatherAPIKey}`)
    return request.then(response => response.data)
        //{
        // console.log(response.data)
}

export default {getAll, fetchWeather}