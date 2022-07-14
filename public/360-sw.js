// token transfer
let token = ""
let system = ""
const chatUrlMap = {
  '360uat': 'https://chat-uat.swivelsoftware.asia/v2/',
  'crmuat': 'https://chat-uat.swivelsoftware.asia/v2/',
  'erpuat': 'https://chat-uat.swivelsoftware.asia/v2/',
  'prod': 'https://chat.swivelsoftware.asia/v2/',
  '360dev': 'https://chat-uat.swivelsoftware.asia/dev-v2/'
}

self.onmessage = (msg) => {
  token = msg.data.token
  system = msg.data.system
}

self.addEventListener('push', e => {
  const payload = e.data.json()
  console.log('Push received', e)
  console.dir(payload)
  self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: 'https://360uat.swivelsoftware.asia/img/logo/Swivel.png',
    data: payload.data,
  })
})
self.addEventListener('notificationclick', (event) => {

  
  const datab = { url: `${self.registration.scope}?open=chat&primaryKey=${event.notification.data.chatroomId}` }
  clients.openWindow(datab.url)
  event.notification.close()
  // event.waitUntil(openWindow(event))


})

async function fetchUrl(event) {
  clients
    .matchAll({
      includeUncontrolled: true,
      type: 'window',
    }).then((clientList) => {
      const baseUrl = chatUrlMap[system] || chatUrlMap['prod']
      fetch(`${baseUrl}chatroom/redirect/${event.notification.data.chatroomId}?origin=https://dev360.swivelsoftware.asia/chat-plus`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'x-system': '360uat'
        }
      }).then(response => {
        response.json().then(data => {
          const datab = { url: `http://localhost:5600/?open=chat&primaryKey=${event.notification.data.chatroomId}` }
          console.log(datab.url)
          clients.openWindow(datab.url)
          event.notification.close()
        })
      })
    })
}