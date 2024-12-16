/* eslint-disable react/prop-types */
const Persons = ({ personsToShow }) => {
    return (
      <>
        {personsToShow.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
      </>
    )
}

export default Persons