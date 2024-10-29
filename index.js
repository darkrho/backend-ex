require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

// middleware function
morgan.token('body', (req) => JSON.stringify(req.body))
//middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :body'))


app.get("/", (request, response) => {
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
app.get("/api/persons", (request, response) => {
  Contact.find({})
    .then(result => {
      response.send(JSON.stringify(entries))
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

// DELETE -> api/persons/id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const contacts = entries.filter(person => person.id !== id)
  entries = contacts
  response.status(204).end()
})

// POST -> api/persons
const createId = () => {
  const id = Math.max(...entries.map(person => Number(person.id)))
  return String(id + 1)
}
const nameExist = (contacts, name) => {
  const nameFilter = contacts.filter((person) => person.name === name)
  if (nameFilter.length > 0) {
    return true
  }
  return false
}
app.post("/api/persons", (request, response) => {
  const body = request.body
  const id = createId()

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'name or number is missing'
    })
  }

  if (nameExist(entries, body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }


  const newContact = { ...body, id: id }
  entries.push(newContact)

  response.json(newContact)
}) */

// start server
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })