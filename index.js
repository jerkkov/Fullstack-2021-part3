const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())
morgan.token('person', (request, response) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status - :response-time ms :person'))

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },

    {
      name: "Paska PErse",
      number: "39-44-5323523",
      id: 3
    }
  ]
  app.get('/api/persons/info', (request, response) => {
      const personsCount = persons.length
      date = new Date()
      response.send(
        '<p>Phonebook has info for ' + personsCount + ' people </p> <p>' + 
        date +'</p>')
  })

  app.get('/api/persons', (request, response) => {
    if(persons) {
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })

  app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const rndId = Math.floor(Math.random() * 100000)
  return rndId
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const redundantName = persons.find(person => person.name === body.name)
  if(!body.name || !body.number || redundantName) {
    return response.status(400).json({
      error: redundantName ? 'name must be unique' : 'content missing'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
