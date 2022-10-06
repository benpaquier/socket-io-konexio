const express = require('express')
const app = express()
const port = process.env.port || 5000
const cors = require('cors')
const morgan = require('morgan')
const http = require('http')
// const { Server } = require('socket.io')
const socketIO = require('socket.io')

const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

app.use(cors('*'))
app.use(morgan('tiny'))

io.on('connection', socket => {
  console.log('someone just connected')

  socket.on('new message', payload => {
    console.log(`New message received: ${payload}`)
    io.sockets.emit('new message', payload)
  })

  socket.on('disconnect', () => {
    console.log('Someone disconnect')
  })
})

app.get('/', (req, res) => {
  res.send('okokokokk')
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
