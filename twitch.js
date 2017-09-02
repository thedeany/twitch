const apiURL = 'https://wind-bow.glitch.me/twitch-api'
const usersList = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
let usersData = []

const urls = usersList.map(user => apiURL + '/users/' + user)
Promise.all(urls.map(url =>
  fetch(url).then(resp => resp.text())
)).then(texts => {
    texts.map(text => {
      usersData.push(JSON.parse(text))
    })
    console.log(usersData)
  })
