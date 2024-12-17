/* eslint-disable react/prop-types */

const Persons = ({ personsToShow, deleteHandler }) => {
    return (
      <>
        {personsToShow.map((person) => 
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteHandler(person.id)}>delete</button>
        </div>)}
      </>
    )
}

export default Persons