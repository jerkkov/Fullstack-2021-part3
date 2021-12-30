const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

//Command line variables
const password = process.argv[2]
const argName = process.argv[3]
const argNumber = process.argv[4]


const url =
`mongodb+srv://admin:${password}@cluster0.cx1lt.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: argName,
        number: argNumber,
    })

    person.save().then(result => {
        console.log(result)
        console.log(`added ${argName} number ${argNumber} to phonebook`)
            
    })
    
}

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})
