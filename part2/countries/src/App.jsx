import { useState, useEffect } from 'react'
import CountryDisplay from './components/CountryDisplay'
import countryService from './services/countries'


function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase()
    setSearch(query)
    setSelectedCountry(null);
    if (query === '') {
      setFilteredCountries([])
    } else {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(query))
      setFilteredCountries(filtered)
    }
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country); // Set the selected country for detailed view
  };
  
  let countryList
  if (selectedCountry) {
    countryList = <CountryDisplay country={selectedCountry} />;
  } else if (filteredCountries.length === 0) {
    countryList === null
  } else if (filteredCountries.length === 1) {
    countryList = <CountryDisplay country={filteredCountries[0]}/>
  } else if (filteredCountries.length <= 10) {
    countryList = filteredCountries.map(c => 
    <p key={c.name.common}>
      {c.name.common}
      <button onClick={() => handleShowCountry(c)}>Show</button>
    </p>)
  } else {
    countryList = <p>Too many matches, specify another filter</p>
  }

  return (
    <>
      <p>
        find countries 
        <input value={search} onChange={handleSearchChange}></input>
      </p>
      {countryList}
    </>
  )
}

export default App
