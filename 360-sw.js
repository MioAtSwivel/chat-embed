// token transfer
let token = ""
let system = ""
const chatUrlMap = {
  'uat': 'https://chat-uat.swivelsoftware.asia/v2/',
  'prod': 'https://chat.swivelsoftware.asia/v2/',
  'dev': 'https://chat-uat.swivelsoftware.asia/dev-v2/'
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
self.addEventListener('notificationclick', async (event) => {
  const response = await fetch(`${chatUrlMap[system]}chatroom/redirect/${event.notification.data.chatroomId}?origin=${self.registration.scope.slice(0, -1)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-system': '360-uat'
    }
  })
  const data = await response.json()
  // const data = {url: 'http://127.0.0.1:5501/?open=chat&primaryKey=6605'}
  console.log(data.url)
  event.waitUntil(clients
    .matchAll({
      includeUncontrolled: true,
      type: 'window',
    }).then((clientList) => {
      if (clients.openWindow) {
        return clients.openWindow(data.url)
      }
    }))
  event.notification.close()
})