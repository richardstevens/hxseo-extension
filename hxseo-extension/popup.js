document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  var checkMenuButton = document.getElementById('checkMenu');

  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      sendRequest( tab.url );
    });
  }, false);

  checkMenuButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      sendRequest( tab.url, '&type=menu' );
    });
  }, false);
}, false);

var sendRequest = function( url, extras ) {
  if ( !extras ) extras = '';
	chrome.tabs.create({
		'url': 'http://hxseo.seo/urlSearch.php?q=' + url + extras,
		'selected': true
	});
};
