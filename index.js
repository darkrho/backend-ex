require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

// middleware functions

// morgan custome string
morgan.token('body', (req) => JSON.stringify(req.body))

// handle errors
const handleErrors = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

}

//middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :body'))


app.get("/", (request, response, next) => {
  response.send('<h1>Hello World<h1/>')
})
/* 
// GET -> info
app.get("/info", (request, response) => {
  const entries_len = entries.length
  const today = new Date()
  const template = `
    <div>
      <p>Phonebook has info for ${entries_len} people<p/>
      <br />
      <p>${today} <p/>
    </div>`
  // send entries data 
  response.send(template)
})
 */

// GET -> api/persons
app.get("/api/persons", (request, response, next) => {
  Contact.find({})
    .then(result => {
      response.send(JSON.stringify(result))
    })
})

/*
// GET -> api/persons/id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const contact = entries.filter(person => person.id === id)
  if (contact.length === 0) {
    return response.status(404).end()
  } else {
    response.json(contact)
  }
})
*/
// DELETE -> api/persons/id
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

// POST -> api/persons

/* 
const nameExist = (contacts, name) => {
  const nameFilter = contacts.filter((person) => person.name === name)
  if (nameFilter.length > 0) {
    return true
  }
  return false
} 
*/
app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'name or number is missing'
    })
  }



  // create a contact for the database
  const newContact = new Contact({
    name: body.name,
    number: body.number
  })
  // save the contact and return it
  newContact.save()
    .then(contactAdded => {
      response.json(contactAdded)
    })

})

// PUT -> api/persons

app.put('api/persons', (request, response, next) => {
  const id = request.body.id

  const newUpdatedPerson = {
    name: request.body.name,
    number: request.body.number
  }
  Contact.findByIdAndUpdate(id, newUpdatedPerson, { new: true })
    .then(updatedContact => {
      console.log(updatedContact)
      response.json(updatedContact)
    })
    .catch(error => next(error))

})

// more middlewares
app.use(handleErrors)
// start server
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })