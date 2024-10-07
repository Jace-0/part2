import axios from 'axios'

const baseUrl = 'http://localhost:3005/countries'
const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const fetchWeather = country => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${weatherAPIKey}`)
    return request.then(response => response.data)
        //{
        // console.log(response.data)
}

export default {getAll, fetchWeather}