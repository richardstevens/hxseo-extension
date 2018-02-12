var splitTests = []
var backgroundPort

chrome.webRequest.onBeforeRequest.addListener(details => {
  if (!details.requestBody) return
  var data = getDataFromArrayBuffer(details.requestBody.raw[0].bytes)
  if (!data || !data.data || data.event !== 'test' || data.data.step !== 'start') return
  splitTests.push(data.data)
},
	{urls: ['*://ga.hxtrack.com/*']},
	[ 'requestBody' ]
)

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (!info.status) return
  if (info.status === 'loading') splitTests = []
  if (info.status === 'complete' && backgroundPort) backgroundPort.postMessage({gotData: true})
})

chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name == 'hxseoScriptExtension')
  backgroundPort = chrome.runtime.connect({name: 'hxseoScriptBackground'})
  port.onMessage.addListener(msg => {
    if (msg.getData) port.postMessage({data: splitTests})
    if (msg.editInline) addOverlayEditInline()
    else removeOverlayEditInline()
  })
})

function addOverlayEditInline () {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: 'js/addOverlay.js'})
  })
}

function removeOverlayEditInline () {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {file: 'js/removeOverlay.js'})
  })
}

function getDataFromArrayBuffer (responseData) {
  var uInt8Array = new Uint8Array(responseData)
  var i = uInt8Array.length
  var binaryString = new Array(i)
  while (i--) binaryString[i] = String.fromCharCode(uInt8Array[i])
  try {
    return JSON.parse(binaryString.join(''))
  } catch (e) {
    return null
  }
}
