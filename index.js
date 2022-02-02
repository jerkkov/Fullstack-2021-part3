require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('person', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status - :response-time ms :person'))

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}


  app.get('/api/persons/info', (request, response) => {
      const personsCount = persons.length
      date = new Date()
      response.send(
        '<p>Phonebook has info for ' + personsCount + ' people </p> <p>' + 
        date +'</p>')
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })
  

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
    response.json(person)
    })
  })

const generateId = () => {
  const rndId = Math.floor(Math.random() * 100000)
  return rndId
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const redundantName = Person.find({}).then(persons => persons.name === body.name) //Kuinka hitossa saan tehtyä tämän tarkistuksen
  if(!body.name || !body.number || redundantName) {
    return response.status(400).json({
      error: redundantName ? 'name must be unique' : 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
