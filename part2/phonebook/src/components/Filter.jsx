/* eslint-disable react/prop-types */
const Filter = ({ search, handleSearchChange }) => {
    return (
      <div>
        filter shown with <input value={search} onChange={handleSearchChange}></input>
      </div>
    )
}

export default Filter