import { useState, useEffect } from 'react'
import CountryDisplay from './components/CountryDisplay'
import countryService from './services/countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase()
    setSearch(query)
    console.log(query)
    if (query === '') {
      setFilteredCountries([])
    } else {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(query))
      setFilteredCountries(filtered)
    }
  }
  
  let countryList
  if (filteredCountries.length === 0) {
    countryList === null
  } else if (filteredCountries.length === 1) {
    countryList = <CountryDisplay country={filteredCountries[0]}/>
  } else if (filteredCountries.length <= 10) {
    countryList = filteredCountries.map(c => 
    <p key={c.name.common}>{c.name.common}</p>)
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
