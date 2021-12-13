import React from 'react'

const Person = ({ person }) => {
    //console.log(person.name)
    return (
        <p>{person.name} {person.number}</p>
    )
}

export default Person