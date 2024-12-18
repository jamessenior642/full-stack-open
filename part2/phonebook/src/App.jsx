/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'
import './index.css'

// Note - handleSearchChange could be moved to filter component.
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, `
        + `replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}

        personsService.updatePerson(person.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
          setMessage(
            `Updated ${newName}'s info`
          )
          setSuccess(true)
          setTimeout(() => {
            setMessage(null)
            setSuccess(false)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
      // alert(`${newName} is already added to phonebook`)
      // return
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
    
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            `Added ${newName}`
          )
          setSuccess(true)
          setTimeout(() => {
            setMessage(null)
            setSuccess(false)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }
  

  const handleDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert('Error: Could not delete the person. They may have already been removed from the server.');
          console.error(error);
        });
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter((person) => 
    person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success}/>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
       newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteHandler={handleDeletePerson} />
    </div>
  )
}

export default App