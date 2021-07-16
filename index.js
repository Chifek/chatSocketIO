const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'))

io.on('connection', (socket) => {
  writeConnectionLogs()
  socket.on('chat message', (data) => {
    let log = 'User ' + data.userName + ' is sent next message: ' + data.message
    writeDailyLog(log)
    io.emit('chat message', {
      message: data.message,
      userName: data.userName
    })
  })
});

function writeDailyLog(content) {
  let date = new Date()
  const name = date.getFullYear() + '-' + date.getDay() + '-' + date.getMonth()
  fs.appendFile('public/logs/' + name + '.txt', content + ' --- at ' + date.toString() + '\n', err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

function writeConnectionLogs() {
  let date = new Date()
  const name = 'connections-' + date.getFullYear() + '-' + date.getDay() + '-' + date.getMonth()
  fs.appendFile('public/logs/' + name + '.txt', ' user connected at ' + date.toString() + '\n', err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

server.listen(3000, () => {
  writeDailyLog('the server is started')
});