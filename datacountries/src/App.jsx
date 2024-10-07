import { useEffect, useState } from "react"
import countryService from './services/countries'

const Search = ({searchTerm, handleSearchChange}) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSearchChange}/>
    </div>
  )
}

const CountryList = ({countries, handleShow}) => {
  return(
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const CountryDetail = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages: </h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="150"/>
      <Weather countryName={country.name.common} countryCapital={country.capital[0]}/>
    </div>
  )
}

const Countries = ({countries, handleShow}) => {
  if (countries.length > 10) {
    return <p>Too many matches, type another filter</p>
  }else if (countries.length > 1) {
    return <CountryList countries={countries} handleShow={handleShow} />
  }else if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }else {
    return <p>No matches found</p>
  }

}

  // Weather component
  const Weather = ({ countryCapital, countryName }) => {
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      countryService.fetchWeather(countryName)
        .then(response => {
          console.log('Weather data:', response);
          setWeather(response); // Set weather data
        });
    }, [countryName]);
  
    if (!weather) return <p>Loading weather...</p>;
  
    return (
      <div>
        <h2>Weather in {countryCapital}</h2>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
  
  

const App = () => {
  const [countries, setCountries] = useState([])
  // search Field
  const [searchTerm, setSearchTerm] = useState('')
  // New state to keep track of the selected country
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })

  }, [])

  // handles search change 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setSelectedCountry(null)
  }

  // handleShow function that updates selectedCountry state
  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  // handles search filter 
  const filterSearch = countries.filter(country => country.name.common && country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
     {/* // handles search  */}
      <Search searchTerm={searchTerm}  handleSearchChange={handleSearchChange}/>
      {/* handles result search */}
      <Countries countries={filterSearch} handleShow={handleShow} />
      {/* if selectedcouuntry is not null, it renders the country details  */}
      {selectedCountry && <CountryDetail country={selectedCountry} />}


    </>
  )
}


export default App