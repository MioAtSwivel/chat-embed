async function _login(username, passwordHash, expireTime, entityKey) {
  const response = await fetch('https://auth.swivelsoftware.asia/auth/local/login', {
    method: 'POST',
    headers: {
      'selected-partygroup': entityKey || '',
      'x-system': '360uat',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password: passwordHash, rememberMe: false, expiry: expireTime })
  });
  const data = await response.json();
  return data['accessToken']
}

function _loadScript(widgetSrc) {
  const widgetLinks = {
    'uat': 'https://chat-uat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js',
    'dev': 'https://chat-uat.swivelsoftware.asia/dev-v2/widgets/swivel-chat-widget.js',
    'prod': 'https://chat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js',
    'local': './dist/swivel-chat-widget.min.js'
  }
  const head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  if (!widgetLinks[widgetSrc]) {
    throw new Error('Invalid source version of chat widget: ' + widgetSrc);
  }
  script.src = widgetLinks[widgetSrc];
  head.appendChild(script);
}

async function _mountWidget({token, system, entityType, entityKey, entityReferenceKey, overrideCss, widgetSrc, full, button, right}) {
  // include the chat widget as specified
  try {
    _loadScript(widgetSrc)
  } catch (e) {
    console.error(e)
    return
  }

  // Handle missing values (entity type/ key/ reference key)
  if (!entityType) { entityType = 'customer' }
  if (!entityKey || !entityReferenceKey) {
    const response = await fetch('https://auth.swivelsoftware.asia/api/person/default', {
      method: 'GET',
      headers: {
        'selected-partygroup': '',
        'x-system': '360uat',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    entityKey = data['selectedPartyGroup']['code']
    entityReferenceKey = data['selectedPartyGroup']['name']
  }

  const widgetContainer = document.getElementById("chat-container"); // div id
  const widget = document.createElement("swivel-chat-widget");
  widget.setAttribute("id", "swivel-chat-widget");
  widget.setAttribute("name", JSON.stringify(["Main"])); // enter the widget name
  // widget.setAttribute('style', widgetStyle)
  widget.setAttribute(
    "token",
    token
  ); // token
  widget.setAttribute("system", (['360uat', '360dev'].includes(system)) ? "360uat" : system); // system
  // if (uat) {
  widget.setAttribute("uat", "true");
  // }
  widget.setAttribute(
    "propdata",
    JSON.stringify({
      full: full,
      button: button,
      right: right,
      system: (['360uat', '360dev'].includes(system)) ? "360uat" : system,
      entityType: entityType,
      entityKey: entityKey, // DEV
      entityReferenceKey: entityReferenceKey, // Development Team
      hasPublicChatroom: true,
      extraChatrooms: [],
      maxShowChatroom: 6,
      leftOffset: 0,
      rightOffset: 0,
      // propdata
    })
  );
  widget.setAttribute("injectCss", widgetContainer.id);
  const shadowRootStyle = document.createElement("style");
  shadowRootStyle.innerHTML = overrideCss; // @todo INJECT CSS
  widgetContainer.appendChild(widget);
  if (widget.shadowRoot) {
    console.log(shadowRootStyle);
    widget.shadowRoot.appendChild(shadowRootStyle);
  }
  document.body.addEventListener("swivel-widget-loaded", () => {
    if (widget.shadowRoot) {
      widget.shadowRoot.appendChild(shadowRootStyle);
    }
  });
}

import { setup, unsubscribe } from "./notification";

/**
 * Main widget create function
 * @param {string} username Username (email) of the user
 * @param {string} passwordHash SHA3-256 Hashed password
 * @param {string} systemMode 'uat' or 'prod'
 */
export async function createWidget({ username, password, system, entityType, entityKey, entityReferenceKey, overrideCss, expireTime, widgetSrc, full, button, right }) {
  const token = await _login(username, password, expireTime, entityKey)
  localStorage.setItem('360-accessToken', token)
  await _mountWidget({token, system, entityType, entityKey, entityReferenceKey, overrideCss, widgetSrc, full, button, right})
  await setup(token, system)
}

export async function stopNotification() {
  unsubscribe();
}
// main();