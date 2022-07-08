const publicVapidKey = 'BFimg4nhhiga2UkChbE_luhDsQoQL1_82igq9D9--RMSSVVOsCC1kd4Rc6V2vDcq7Bh0feKWxcvpZpY8eBr4Vhg'

export async function setup(jwtToken) {
  const registration = await registerServiceWorker()
  console.log(registration)
  if (registration){
    await subscribe(registration, jwtToken)
  }
  console.log('[chat-embed] service worker registered')
}

async function registerServiceWorker(){
  if ('serviceWorker' in navigator) {
    // デフォルトのスコープを使用して、
    // サイトのルートでホストされるサービスワーカーを登録します。
    const registration = await navigator.serviceWorker.register('/360-sw.js')
    return registration
  } else {
    console.log('[chat-embed] No service worker available');
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function subscribe(registration, jwtToken) {
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })

  const reqHeaders = {
    'content-type': 'application/json',
    Authorization: `Bearer ${jwtToken}`, // subscribe with user token
  }
  const response = await fetch(
    `https://auth.swivelsoftware.asia/api/notification/subscribe`, // @todo Change to use service call instead
    {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: reqHeaders,
    }
  )
  if (response.ok) {
    console.dir(response)
  }
}

async function unsubscribe()