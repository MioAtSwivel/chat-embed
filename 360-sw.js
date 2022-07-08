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