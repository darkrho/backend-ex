const mongoose = require('mongoose')
const { Schema } = mongoose

// get password and data
if (process.argv.length > 5) {
  console.log("use: <password> <name> <number>")
  return process.exit(1)
}

const db_name = "contactNumber"
let password;
let name;
let number

if (process.argv.length === 3) {
  password = process.argv[2]
} else {
  password = process.argv[2]
  name = process.argv[3]
  number = process.argv[4]
}

// db Schema
const contactSchema = new Schema({
  name: String,
  number: String
})

// model for mongoose to work with
const Person = mongoose.model('Person', contactSchema)

// point of contact with database
const uri =
  `mongodb+srv://fullstack:${password}@cluster0.tw3y9nr.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`

// connect
mongoose.connect(uri)

if (name === undefined || number === undefined) {
  Person
    .find({})
    .then(result => {
      console.log("phonebook:")
      result.forEach(contact => {
        let template = `${contact.name} ${contact.number}`
        console.log(template)
      })
      mongoose.connection.close()
    })

} else {

  // create contact
  const contact = new Person({ name, number })
  // save conctact
  contact.save()
    .then(
      result => {
        console.log("contact saved")
        mongoose.connection.close()
      }
    )

}