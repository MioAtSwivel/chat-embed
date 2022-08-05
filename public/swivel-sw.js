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
const cacheName = 'swivel360_cache'

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
  const datab = { url: `${self.registration.scope}` }
  clients.openWindow(datab.url)
  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: 'window',
      })
      .then(function (clients) {
        if (clients && clients.length) {
          console.log('sending message back to the browser')
          clients[clients.length - 1].postMessage({
            type: 'CHATROOM_OPEN',
            roomId: event.notification.data.chatroomId
          })
        }
        // if (clients.openWindow) {
        //   if (event.notification.data.chatroomType == 'dashboard') {
        //     return clients.openWindow(
        //       `/?open=chat&primaryKey=${event.notification.data.chatroomId}`
        //     )
        //   } else {
        //     for (var i = 0; i < clientList.length; i++) {
        //       var client = clientList[i]
        //       if (client.url == '/chat-plus' && 'focus' in client) return client.focus()
        //     }
        //     return clients.openWindow(
        //       `/chat-plus/?open=chat&primaryKey=${event.notification.data.chatroomId}`
        //     )
        //   }
        // }
      })
  )
  event.notification.close()
  // event.waitUntil(openWindow(event))
})

// Cache the chat widget
// self.addEventListener('fetch', function (event) {
//   if (event.request.method === 'GET' && event.request.destination==='script') {
//     event.respondWith(
//       caches.open(cacheName).then((cache) => {
//         return cache.match(event.request.url)
//           .then(function (cachedResponse) {
//             if (cachedResponse) {
//               return cachedResponse;
//             }

//             // Otherwise, hit the network
//             return fetch(event.request).then((fetchedResponse) => {
//               // Add the network response to the cache for later visits
//               cache.put(event.request, fetchedResponse.clone());

//               // Return the network response
//               return fetchedResponse;
//             });
//           })
//       })
//     );
//   }
// });

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