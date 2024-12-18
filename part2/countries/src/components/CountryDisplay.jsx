/* eslint-disable react/prop-types */
const CountryDisplay = ({ country }) => {
    const languages = Object.values(country.languages || {});
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital && country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h2>Languages:</h2>
        <ul>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '200px', border: '1px solid black' }}
        />
      </div>
    );
  };
  
export default CountryDisplay;