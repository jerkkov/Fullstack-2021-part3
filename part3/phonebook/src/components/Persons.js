import React from 'react'

const Persons = ({ person, removePerson }) => {
    //To show all names or filtered result
    
    return (
           <p>{person.name} {person.number} 
           <button onClick={removePerson}> delete </button></p> 
    )
}
export default Persons