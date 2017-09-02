const apiURL = 'https://wind-bow.glitch.me/twitch-api'
const usersList = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
let usersData = []
let streamsData = []

const usersUrls = usersList.map(user => apiURL + '/users/' + user)
const streamsUrls = usersList.map(user => apiURL + '/streams/' + user)

function getUsers() {
  Promise.all(usersUrls.map(url =>
    fetch(url).then(resp => resp.text())
  )).then(texts => {
      texts.map(text => {
        usersData.push(JSON.parse(text))
      })
      console.log(usersData)
      getStreams()
    })
}

function getStreams() {
  Promise.all(streamsUrls.map(url =>
    fetch(url).then(resp => resp.text())
  )).then(texts => {
      texts.map(text => {
        streamsData.push(JSON.parse(text))
      })
      console.log(streamsData)
      buildUsersAndStreams()
    })
}

function buildUsersAndStreams() {
  for (const index in streamsData) {
    const s = streamsData[index]
    const u = usersData[index]
    const isLive = s.stream ? true : false

    const li = document.createElement('li')
    li.classList.add('stream')
    if (isLive) li.classList.add('live')

    const icon = renderIcon(s, u)
    const name = renderName(s, u)
    const status = renderStatus(s, u)

    li.appendChild(icon)
    li.appendChild(name)
    li.appendChild(status)

    renderUsersAndStreams(li)
  }
}

function renderUsersAndStreams(li) {
  const ul = document.querySelector('ul.streams')
  ul.appendChild(li)
}

function renderIcon(stream, user) {
  const icon = document.createElement('div')
  icon.classList.add('icon')

  const iconImage = document.createElement('img')
  iconImage.src = user.logo ? user.logo : 'https://blog.roblox.com/wp-content/uploads/2016/12/Twitch-Icon.png'
  iconImage.alt = user.display_name

  icon.appendChild(iconImage)
  return icon
}

function renderName(stream, user) {
  const name = document.createElement('div')
  name.classList.add('name')

  const nameLink = document.createElement('a')
  nameLink.href = 'https://www.twitch.tv/' + user.name
  nameLink.appendChild(document.createTextNode(user.display_name))

  name.appendChild(nameLink)
  return name
}

function renderStatus(stream, user) {
  const status = document.createElement('div')
  status.classList.add('status')

  const statusInner = document.createElement('div')
  statusInner.appendChild(document.createTextNode('Streaming '))

  if (stream.stream) {
    const game = document.createElement('span')
    game.classList.add('game')
    game.appendChild(document.createTextNode(stream.stream.game))

    const gameStatus = document.createElement('span')
    gameStatus.classList.add('game-status')
    gameStatus.appendChild(document.createTextNode(stream.stream.channel.status))

    statusInner.appendChild(game)
    status.appendChild(statusInner)
    status.appendChild(gameStatus)
  } else {
    status.appendChild(document.createTextNode('offline'))
  }

  return status
}


getUsers()
