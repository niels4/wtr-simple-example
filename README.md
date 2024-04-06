# WTR Simple Example

This repo is meant to serve as a reference for creating a simple front end application using [websocket-text-relay](https://github.com/niels4/websocket-text-relay).
It is limited to just 1 html file, 1 css file, and 1 javascript file. This makes it a great tool for following along with web development
books or simple youtube tutorials. See [Keven Powell's youtube channel](https://www.youtube.com/kevinpowell) for some focused tutorials on modern html and css.

## setup your editor

To use this project, first follow instructions in the [websocket-text-relay](https://github.com/niels4/websocket-text-relay) readme for installing the the language server plugin for your text editor.

Once your text editor is running the language server plugin, you should be able to see the status UI at [http://localhost:38378](http://localhost:38378).

## check out and run HTTP server

Check out the repo and then start a static HTTP server at the root of the repo. I like to use `npx serve`, but any plain static HTTP server will do.

```
git clone https://github.com/niels4/wtr-simple-example.git
cd wtr-simple-example
npx serve


   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:    http://localhost:62433             │
   │   - Network:  http://192.168.50.171:62433        │
   │                                                  │
   │   This port was picked because 3000 is in use.   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘

```

After running serve, the local address and port is copied to the clipboard, so just open up a browser and paste it in the location bar.

Once the page opens, you should see the client show up in the [WTR status UI](http://localhost:38378)

Open up the main.html file in your text editor and make some changes to the text. You should see you changes show up
immediately as you type in the browser, also you should see activity in the [WTR status UI](http://localhost:38378)

You can do the same with main.css

Whenever you make changes to the main.js file, it gets reevaluted. If you wish to hook up to any DOM events, be sure
to use the onEvent function so you don't get event leaks on every eval.

If you wich to change the name of the root directory, be sure to change the `PROJECT_DIRECTORY` variable in the `lib/wtr-simple-setup.js` file to match the parent directory of the index.html file
