const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
console.log('connecting to', uri)
mongoose.connect(uri)
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})


const personSchema = new mongoose.Schema({
  name:  {
    type: String,
    minlength: 3
  },
  number: {
   type: String,
   validate: {
     validator: function(v) {
       return /^(\d{3})-\d{8,}/.test(v) || /^(\d{2})-\d{7,}/.test(v);
     },
     message: props => `${props.value} is not a valid phone number.`
   }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', personSchema)
