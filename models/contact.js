const mongoose = require('mongoose')
const { Schema } = mongoose


// db Schema
const contactSchema = new Schema({
  name: String,
  number: String
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