const mongoose = require('mongoose')
const { Schema } = mongoose


// db Schema with validation
const contactSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5-8}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! `
    },
    required: true
  }
})

// transform schema
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // change _id for id and convert to string
    returnedObject.id = returnedObject._id.toString()
    // don't show the _id and __v value of database
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// model for mongoose to work with
const Contact = mongoose.model('Person', contactSchema)

// point of contact with database
const uri = process.env.MONGODB_URI

// connect
mongoose.set('strictPopulate', false)
mongoose.connect(uri)
  .then(result => {
    console.log('connected to database')
  })
  .catch(error => {
    console.log(`error connecting to database: ${error.message}`)
  })

module.exports = Contact 