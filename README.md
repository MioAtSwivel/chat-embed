# Chat Widget Anywhere

Embed chat widget into anywhere that runs HTML and JS, with username and password

## Library Functions

This build file when included through `<script>` tags, exposes itself as `ChatWidget` library, with the following 2 functions:

- `createWidget(username: string, password: string, systemMode: '360uat'|'360dev'|[other valid system code])` - Logs in and create the widget
- `stopNotification()` - Call on logout to stop notifications from chat service

self.registration.scope.slice(0, -1)


## Installation

### Files to prepare
Prepare/find the following files from the repository:
- `create-chat-widget.js` from `dist/` folder
- (optional) `sha.js` from `dist/` folder
- `360-sw.js` from `public/` folder
- `index.html` from `public/` folder (for reference usage)

### Steps
Place a div with id `chat-container` into where you want it to be with
```html
<div id="chat-container"></div>
```

Include a copy of `swivel-chat-widget-min.js` and helper script at the end of html page with
  ```html
  <script type="text/javascript" src="https://chat-uat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js"></script> <!-- UAT WIDGET-->
  <!-- <script type="text/javascript" src="https://chat-uat.swivelsoftware.asia/dev-v2/widgets/swivel-chat-widget.js"></script> --> <!-- DEV WIDGET -->
  <!-- <script type="text/javascript" src="https://chat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js"></script> --> <!-- PRODUCTION WIDGET-->
  <script type="text/javascript" src="./create-chat-widget.js"></script>
  <!-- Include additional sha.js if plaintext password is used -->
  <script type="text/javascript" src="./sha.js"></script>
  ```

Create additional `<script>` block and run the following
```html
<script>
/**
 * Main widget create function
 * @param {string} username - Username (email) of the user
 * @param {string} passwordHash - SHA3-256 Hashed password
 * @param {string} system - magic value 'erp' | 'erpuat' | '360uat' | '360dev' | [other valid system code]
 */
    ChatWidget.createWidget({
      username: "mio9+chat109@swivelsoftware.com",
      password: "hash",
      system: "360uat",
      entityKey: "DEV",
      entityReferenceKey: "Development Key"
    })
</script>
```
⚠ Place `360-sw.js` into root directory of the site url for notification



## Usage Example
```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <!-- Embed chat widget button -->
    <p>Some other elements</p>
    <div id="chat-container"></div> 
    <p>Some more other elements</p>
  </body>

  <!-- Include widget and helper script -->
  <script type="text/javascript" src="https://chat-uat.swivelsoftware.asia/v2/widgets/swivel-chat-widget.js"></script>
  <script type="text/javascript" src="./create-chat-widget.js"></script>

  <!-- Create the widget -->
  <script>
    ChatWidget.createWidget({
      username: "mio9+chat109@swivelsoftware.com",
      password: "hash",
      system: "360uat",
      entityKey: "DEV",
      entityReferenceKey: "Development Key"
    }) 
  </script>
</html>
```

For detailed running example, please reference the `index.html` file inside `public/` and match the use case in your application