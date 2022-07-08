# Chat Widget Anywhere

Embed chat widget into anywhere that runs HTML and JS, with username and password

## Installation

Place a div with id `chat-container` into where you want it to be with
```html
<div id="chat-container"></div>
```

Include a copy of `swivel-chat-widget-min.js` and helper script at the end of html page with
  ```html
  <script type="text/javascript" src="./swivel-chat-widget.min.js"></script>
  <script type="text/javascript" src="./create-chat-widget.js"></script>
  ```

Create additional `<script>` block and run the following
```html
<script>
/**
 * Main widget create function
 * @param {string} username Username (email) of the user
 * @param {string} passwordHash SHA3-256 Hashed password
 */
    createWidget("mio9+chat109@swivelsoftware.com", "6aa3665554665c26fe82ae63f9997eb8b7930f9a6dd943a21ea8ff6da13333ae")
</script>
```

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
    createWidget("mio9+chat109@swivelsoftware.com", "ed46fbf7cbd33c61df4a97fc3c444393f838ecbdd438e34d903f4d0a6854ee39") 
  </script>
</html>


```