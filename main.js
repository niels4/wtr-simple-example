const onEvent = window.__WTR__onEvent

if (window.__WTR__state == null) {
  window.__WTR__state = {count: 0}
}

const state = window.__WTR__state

const countButtonElement = document.getElementById("count_button")
const countDisplayElement = document.getElementById("count_display")

countDisplayElement.innerHTML = state.count

// use onEvent to automatically reset event handlers on every eval
onEvent(countButtonElement, 'click', () => {
  state.count++
  countDisplayElement.innerHTML = state.count
})

console.log("Simple WTR Example")
