var popupPort = chrome.runtime.connect({name: 'hxseoScriptExtension'})
var url = false

document.addEventListener('DOMContentLoaded', () => {
  var checkPageButton = document.getElementById('checkPage')
  var checkMenuButton = document.getElementById('checkMenu')
  var applyButton = document.getElementById('applyChanges')

  applyButton && applyButton.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url})
        window.close()
    })
  }, false)

  checkPageButton && checkPageButton.addEventListener('click', () => {
    chrome.tabs.getSelected(null, tab => {
      sendRequest( tab.url );
    })
  }, false)

  checkMenuButton && checkMenuButton.addEventListener('click', () => {
    chrome.tabs.getSelected(null, tab => {
      sendRequest( tab.url, '&type=menu' )
    })
  }, false)

  popupPort.postMessage({getData: true})
}, false)

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
  if (!tabs || !tabs[0] || !tabs[0].url) return
	url = tabs[0].url
})

chrome.runtime.onConnect.addListener( port => {
  console.assert(port.name === 'hxseoScriptBackground');
	port.onMessage.addListener( response => {
	  sortMessage(response)
	})
})
popupPort.onMessage.addListener( response => {
  sortMessage(response)
})

var sortMessage = function(response) {
	if (!response) return
	if (response.data) return drawTable(response.data)
	if (response.gotData) return popupPort.postMessage({getData: true})
}

var sendRequest = function( url, extras ) {
  if ( !extras ) extras = ''
	chrome.tabs.create({
		'url': 'http://hxseo/urlSearch.php?q=' + url + extras,
		'selected': true
	})
}

function flipTest(e, name) {
	chrome.cookies.get({ url: url, name: name }, cookie => {
		if (!cookie) return
		e.innerHTML = makeTestName(cookie.value)
		var value = flipTestVariant(cookie.value)
		var textNode = e.parentNode.parentNode.childNodes[1]
		textNode.innerHTML = value
		var type = value === 'show_original' ? 'red' : 'green'
		textNode.classList.remove('red', 'green')
		textNode.classList.add(type)
    chrome.cookies.set({ url: url, name: name, value: value })
    var applyButton = document.getElementById('applyChanges')
    applyButton.style.display = 'block'
	})
}

function flipTestVariant(variant) {
  return variant === 'show_original' ? 'show_alternative' : 'show_original'
}

function makeTestName(value, reverse = false) {
  if (reverse) value = flipTestVariant(value)
  return value === 'show_original' ? 'Show Original' : 'Show Alternative'
}

function drawTable(data) {
  var splitTestTable = document.getElementById('splitTests')
	if (!splitTestTable || !data.length) return;

	var tbody = splitTestTable.getElementsByTagName('tbody')[0]
	data.map( item => {
		var newRow = tbody.insertRow(tbody.rows.length)

    // Write name
		var newCell = newRow.insertCell(0)
		var newText = document.createTextNode(item.test_name)
		newCell.appendChild(newText)

    // Write variant type
		newCell = newRow.insertCell(1)
		newText = document.createTextNode(item.variant)
		var type = item.variant === 'show_original' ? 'red' : 'green'
		newCell.appendChild(newText)
		newCell.classList.add(type)

    // Write button
		newCell = newRow.insertCell(2)
		var button = document.createElement('button')
		button.onclick = function() { flipTest(this, item.test_name) }
		button.innerHTML = makeTestName(item.variant, true)
		newCell.appendChild(button)
	})
}
