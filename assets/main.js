const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')
const userName = prompt('Your name:')
nameBlock.innerHTML = `${userName}`

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', {
      message: input.value,
      userName: userName
    })
    input.value = ''
  }
})

socket.on('chat message', (data) => {
  const item = document.createElement('li')
  item.innerHTML = `<span>${data.userName}</span>: ${data.message}`
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})