// Hämtar paketen
const express = require('express')
const fs = require('fs')

// Initierar servern
const app = express()

// Ser till att servern kan se och använda datan som skickas i request
app.use(express.json())

// När man kör localhost:3000/bookings hämtas bokningarna och skickas tillsammans med status 200 (OK)
app.get('/bookings', (req, res) => {
  // Hämta alla bokningar från databasen
  const bookings = require('./db/Bookings.json')
  
  // skicka tillbaka alla bokningar
  res.status(200).send(bookings)
})

// Tar emot en request av typen post som har information om en ny bokning som ska skapas
app.post('/booking', (req, res) => {
  // Hämtar alla bokningar och lägger till den nya i listan
  const bookings = require('./db/Bookings.json')
  const newBooking = {
    ...req.body,
    id: bookings.length + 1
  }
  bookings.push(newBooking)
  
  // Uppdaterar databasen med nya bokningar
  fs.writeFileSync('./db/Bookings.json', JSON.stringify(bookings))

  // Skickar tillbaka 201 (CREATED) och alla bokningar (inklusive den nya)
  res.status(201).send(bookings)
})

// Hämta bara en boking
app.get('/booking/:id', (req, res) => {
  const bookings = require('./db/Bookings.json')

  // leta reda på bokningen
  let booking
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id == req.params.id) {
      booking = bookings[i]
      break
    }
  }

  res.status(200).send(booking)
})

// Uppdaterar en bokning
app.put('/booking', (req, res) => {
  const bookings = require('./db/Bookings.json')

  // sparar bodyn (bokningen som ska uppdateras) i en variabel
  const updatedBooking = req.body

  // letar reda på vilken bokning det är vi ska uppdatera och uppdaterar den
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id == updatedBooking.id) {
      bookings[i] = updatedBooking
      break
    }
  }

  // Sparar kalaset i databasen
  fs.writeFileSync('./db/Bookings.json', JSON.stringify(bookings))

  // skickar tillbaka att det gick prima ballerina samt alla bokningar
  res.status(200).send(bookings)
})

// Startar serveren och gör så att den lyssnar på porten 3000 (kan vara en annan port om man vill)
app.listen(3000)

