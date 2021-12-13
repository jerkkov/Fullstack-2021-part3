import React, { useState, useEffect } from 'react'
import Addperson from './components/Addperson'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => { 
  const [showAll, setShowAll] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    //console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
    //console.log('promise fulfilled')
    setPersons(initialPersons)
    })
  }, [])
  //console.log('render', persons.length, 'persons')

  //Add new person
  const personManagement = (event) => { 
    //Change number of the existing person 
    if (persons.some(person => person.name === newName)){
      event.preventDefault()
     if(window.confirm(`${newName} is already added to notebook, replace the old number with a new one?`)) {
      const personInvolved = persons.find(person => person.name === newName)
      return updateNumber(personInvolved.id)
     }
     else
     return console.log('Clicked cancel')
    }
    //Add new person to the server
    event.preventDefault()
    addPerson()

  }

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      
      setNotificationMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2000);

      setNewName('')
      setNewNumber('')
    })
  }

  const updateNumber = (id) => {
    const personInvolved = persons.find (n => n.id === id)
    const changedNumber = { ...personInvolved, number: newNumber}

    personService
    .update(id, changedNumber)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })

    setNotificationMessage(
      `${personInvolved.name} number modified`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000);

    setNewName('')
    setNewNumber('')
  }

   const personToBeRemoved = id => {
    const personInvolved = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${personInvolved.name} ?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== id))
          
          setNotificationMessage(
            `Removed ${personInvolved.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000);
      })
      .catch(error => {
        setErrorMessage(
          'This person is not saved to the server'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000);
        console.log(error)
      })
    }
  }



    
  

    //Inputfield management for name
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  //Inputfield management for number
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

    //Inputfield management for number
  const handleFindChange = (event) => {
    //console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const filter = showAll.length < 1
      ? persons
      : persons.filter(person => 
        person.name.toLowerCase().includes(showAll.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleFindChange={handleFindChange} />
      
      <h2>Add a new</h2>
      <Addperson persons={persons}  
                  newName={newName}
                  newNumber={newNumber}
                  personManagement={personManagement}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange} 
                    
      />
      <h2>Numbers</h2>
      <div>
            {filter.map((person, i) =>
                <Persons 
                key={i}
                person={person}
                removePerson={() => personToBeRemoved(person.id)} 
                />
            )}
        </div>
    </div>
  )
}

export default App