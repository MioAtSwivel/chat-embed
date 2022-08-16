# Chat Widget Anywhere

Embed chat widget into anywhere that runs HTML and JS, with username and password

## Library Functions

This build file when included through `<script>` tags, exposes itself as `ChatWidget` library, with the following 2 functions:

- `createWidget()` - Logs in and create the widget
- `stopNotification()` - Call on logout to stop notifications from chat service


## Installation

### Files to prepare
Prepare/find the following files from the repository:
- `create-chat-widget.js` from `dist/` folder
- (optional) `sha.js` from `dist/` folder
- `360-sw.js` from `public/` folder
- `index.html` from `public/` folder (for reference usage)

### Steps

1. Locate the file you want to embed chat widget in

2. Place a div with id `chat-container` into where you want it to be with
    ```html
    <div id="chat-container"></div>
    ```

3. Include a copy of `create-chat-widget.js` (the widget mounting script) at the end of html page as following:
    ```html
    <script type="text/javascript" src="./create-chat-widget.js"></script>
    <!-- Include additional sha.js if plaintext password is used -->
    <script type="text/javascript" src="./sha.js"></script>
    ```

4. Create additional `<script>` block as following, and change the parameters accordingly:

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
      password: "hash", // SHA3-256 hash of the user's plaintext password
      system: "360uat", // System where the user belongs to, either "360", "360uat", "erp" or "erpuat"
      entityType: "customer", // Default to 'customer' if not provided
      entityKey: "DEV", // Default to first party group if not provided
      entityReferenceKey: "Development Key",  // Default to first party group if not provided
      expireTime: "1h", // 1 hour as specified in ERP
      widgetSrc: 'uat', // Which version of chat to use, either "dev", "uat" or "prod"
      overrideCss: `
        .chatroom-btn-title
        {
          font-size: 14px;
        }
        .v-input__append-inner {
          padding-top: 6px;
        }
        .title-div {
          font-size: 1rem;
        }
        .chatroom-btn {
          padding-left: 5px;
          padding-right: 5px;
        }` // Custom style you want to apply to chat
    });
    </script>
    ```

### Push Notification

1. Place `public/360-sw.js` into root directory of the site url for notification
2. Run `ChatWidget.stopNotification();` any stage in your program to stop the widget from sending push notifications. (e.g. User logs out)



## Usage Example
Preview live server can be started with `yarn dev`. Files inside the `public/` folder is served on the live preview server

For detailed running example, please reference the [index.html](https://github.com/MioAtSwivel/chat-embed/blob/main/public/index.html) and match the use case in your application. 

Have fun getting chat+ to work wherever you want 👋 🎉