// prod: BFimg4nhhiga2UkChbE_luhDsQoQL1_82igq9D9--RMSSVVOsCC1kd4Rc6V2vDcq7Bh0feKWxcvpZpY8eBr4Vhg
// dev: BCGCDm1yl8nX1WZbW6t6WtB4_v7mqyAIFPqztZs-pWBucoD9onTjPZdqeqldElN0Yl76nGNKsMAUP6JGXW0tfUg
const publicVapidKey = 'BFimg4nhhiga2UkChbE_luhDsQoQL1_82igq9D9--RMSSVVOsCC1kd4Rc6V2vDcq7Bh0feKWxcvpZpY8eBr4Vhg'
let globalSubscription;

export async function setup(jwtToken, systemMode) {
  const registration = await registerServiceWorker(jwtToken, systemMode)
  console.log(registration)
  if (registration) {
    await subscribe(registration, jwtToken)
  }
  console.log('[chat-embed] service worker registered')
}

async function registerServiceWorker(jwtToken, systemMode) {
  if ('serviceWorker' in navigator) {
    // デフォルトのスコープを使用して、
    // サイトのルートでホストされるサービスワーカーを登録します。
    const registration = await navigator.serviceWorker.register('/swivel-sw.js')
    navigator.serviceWorker.ready.then(reg => {
      reg.active.postMessage({token: jwtToken, system: systemMode})
    })
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

  globalSubscription = subscription

  const reqHeaders = {
    'content-type': 'application/json',
    Authorization: `Bearer ${jwtToken}`, // subscribe with user token
  }
  const response = await fetch(
    `https://auth.swivelsoftware.asia/api/notification/subscribe`,
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

export async function unsubscribe() {
  const jwtToken = localStorage.getItem('360-accessToken')
  const reqHeaders = {
    'content-type': 'application/json',
    Authorization: `Bearer ${jwtToken}`, // subscribe with user token
  }
  const response = await fetch(
    `https://auth.swivelsoftware.asia/api/notification/unsubscribe`,
    {
      method: 'POST',
      body: JSON.stringify(globalSubscription),
      headers: reqHeaders,
    }
  )
  if (response.ok) {
    console.dir(response)
  }
}