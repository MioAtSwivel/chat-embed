async function _login(username, passwordHash) {
  const response = await fetch('https://auth.swivelsoftware.asia/auth/local/login', {
    method: 'POST',
    headers: {
      'x-system': '360uat',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password: passwordHash, rememberMe: false })
  });
  const data = await response.json();
  return data['accessToken']
}

function _mountWidget(token, system, entityKey, entityReferenceKey) {
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
      full: false,
      button: true,
      right: false,
      system: (['360uat', '360dev'].includes(system)) ? "360uat" : system,
      entityType: "customer",
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
  shadowRootStyle.innerHTML = "";
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
export async function createWidget({ username, password, system, entityKey, entityReferenceKey }) {
  const token = await _login(username, password)
  localStorage.setItem('360-accessToken', token)
  _mountWidget(token, system, entityKey, entityReferenceKey)
  await setup(token, system)
}

export async function stopNotification() {
  unsubscribe();
}
// main();