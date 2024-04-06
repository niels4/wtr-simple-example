import { WebsocketClient } from "./WebsocketClient.js"

const PROJECT_DIRECTORY = "wtr-simple-example"
const PORT = 38378
const CSS_FILE = "main.css"
const HTML_FILE = "main.html"
const JS_FILE = "main.js"

const cssPath = PROJECT_DIRECTORY + "/" + CSS_FILE
const htmlPath = PROJECT_DIRECTORY + "/" + HTML_FILE
const jsPath = PROJECT_DIRECTORY + "/" + JS_FILE

const cssElement = document.getElementById('main_style')
const htmlElement = document.body

let lastJsText = null

const cleanupFuncs = []

const cleanupAll = () => {
  cleanupFuncs.forEach(f => f())
  cleanupFuncs.length = 0
}

const onEvent = (target, eventName, func) => {
  target.addEventListener(eventName, func)
  const cleanup = () => target.removeEventListener(eventName, func)
  cleanupFuncs.push(cleanup)
}
window.__WTR__onEvent = onEvent

const handleCss = (contents) => {
  cssElement.innerText = contents
}

const handleHtml = (contents) => {
  htmlElement.innerHTML = contents
  if (lastJsText) { handleJs(lastJsText) }
}

const handleJs = (contents) => {
  try {
    cleanupAll()
    eval(contents)
    lastJsText = contents
  } catch (e) {
    window._lastEvalError = e
    console.log(e)
  }
}

const fileHandlers = new Map([
  [cssPath, handleCss],
  [htmlPath, handleHtml],
  [jsPath, handleJs],
])

const handleWatchFile = (message) => {
  const fileHandler = fileHandlers.get(message.endsWith)
  if (!fileHandler) {
    console.log("Uknown file update", message)
    return
  }
  fileHandler(message.contents)
}

const handleLogMessage = (message) => {
  console.log("LOG:", message)
}

const messageHandlers = new Map([
  ["watch-file", handleWatchFile],
  ["watch-log-messages", handleLogMessage],
])

const ws = new WebsocketClient({port: PORT})

ws.emitter.on('message', (message) => {
  const messageHandler = messageHandlers.get(message.method)
  if (!messageHandler) {
    console.log("Uknown message method:", message)
  }
  messageHandler(message)
})

const initFiles = async () => {
  await fetch(HTML_FILE).then(r => r.text()).then(handleHtml)
  await fetch(CSS_FILE).then(r => r.text()).then(handleCss)
  await fetch(JS_FILE).then(r => r.text()).then((jsText) => {
    requestAnimationFrame(() => { // make sure css is  applied first
      handleJs(jsText)
    })
  })
}

const subscribeWatchers = () => {
  ws.sendMessage({ method: "init", name: "WTR Simple Example" })
  ws.sendMessage({method: "watch-log-messages"})
  ws.sendMessage({ method: "watch-file", endsWith: cssPath })
  ws.sendMessage({ method: "watch-file", endsWith: htmlPath })
  ws.sendMessage({ method: "watch-file", endsWith: jsPath })
}

await initFiles()
subscribeWatchers()
