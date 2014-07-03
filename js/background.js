chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		var ua = JSON.parse(localStorage["currentUA"]).ua;
		var enabled = localStorage["enabled"];
		if(enabled == "true" && ua.toLowerCase() != "default" && ua.length != 0 && ua != undefined)
		{
			for (var i = 0; i < details.requestHeaders.length; ++i) {
				if (details.requestHeaders[i].name === 'User-Agent') {
					details.requestHeaders[i].value = ua;
					break;
				}
			}
		}
		return {
			requestHeaders: details.requestHeaders
		};
	}, {
		urls: ["<all_urls>"]
	}, ["blocking", "requestHeaders"]);