/*
 * Defining namespace for addon JS
 */
if ("undefined" == typeof(AnonifyBrowser)) {
	var AnonifyBrowser = {};
};

AnonifyBrowser.Interface = {

	OS_LIST_ID : "anonifybrowser-popup-os",
	OS_VER_LIST_ID : "anonifybrowser-popup-osver",
	TRIGGER_ID : "anonifybrowser-power-button",
	/*
	 * UA String list
	 */
	UAString : [{
		"default" : ["Default", {
			"Default" : "default"
		}],
		"android" : ["Android", {
			"Cupcake 1.5" : "Mozilla/5.0 (Linux; U; Android 1.5; en-us; T-Mobile G1 Build/CRC1) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1",
			"Doughnut 1.6" : "Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC Magic Build/DRC92) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1",
			"Eclair 2.0" : "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/ 530.17",
			"Eclair 2.0.1" : "Mozilla/5.0 (Linux; U; Android 2.0.1; en-us; Droid Build/ESD56) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
			"Eclair 2.1" : "Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
			"Froyo 2.2" : "Mozilla/5.0 (Linux; U; Android 2.2; en-us; ViewPad7 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
			"Gingerbread 2.3" : "Mozilla/5.0 (Linux; U;Android 2.3.7; en-us; Nexus One Build/ERD62) AppleWebKit/533.1 (KHTML,like Gecko) Version/4.0 Mobile Safari/533.1",
			"Gingerbread 2.3.6" : "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; LG-E400 Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
			"Gingerbread 2.3.7" : "Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; LG-E400 Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
			"Honeycomb 3.0" : "Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
			"Icecream Sandwich 4.0" : "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-P5100 Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
			"Icecream Sandwich 4.0.3" : "Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
			"Icecream Sandwich 4.0.4" : "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 Mobile Safari/535.19",
			"Jelly Bean 4.1" : "Mozilla/5.0 (Linux; U; Android 4.1; en-gb; Build/JRN84D) AppleWebKit/534.30 (KHTML like Gecko) Version/4.0 Mobile Safari/534.30",
			"Jelly Bean 4.1.1" : "Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Nexus S Build/JRO03E) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
			"Jelly Bean 4.2" : "Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
			"Jelly Bean 4.3" : "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36",
			"Kitkat 4.4" : "Mozilla/5.0 (Linux; Android 4.4; Nexus 7 Build/KOT24) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.105 Safari/537.36"
		}],
		"bbos" : ["BlackBerry OS", {
			"BlackBerry 9700" : "BlackBerry9700/5.0.0.862 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/331 UNTRUSTED/1.0 3gpp-gba",
			"BlackBerry 9800" : "Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.450 Mobile Safari/534.8+",
			"BB10 Touch" : "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.1.0.4633 Mobile Safari/537.10+",
			"BB10 Keypad" : "Mozilla/5.0 (BB10; Kbd) AppleWebKit/537.35+ (KHTML, like Gecko) Version/10.2.1.1925 Mobile Safari/537.35+"
		}],
		"linux" : ["Linux", {
			"Firefox 31.0" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Chrome (Generic)" : "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/530.5 (KHTML, like Gecko) Chrome/ Safari/530.5",
			"Chrome 37.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
			"Firefox 30.0" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:30.0) Gecko/20120101 Firefox/30.0",
			"Chrome 36.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
			"Firefox 29.0" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20120101 Firefox/29.0",
			"Chrome 35.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36",
			"Firefox 25.0" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:25.0) Gecko/20100101 Firefox/25.0",
			"Chrome 30.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36",
			"Firefox 21.0" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:21.0) Gecko/20130331 Firefox/21.0",
			"Chrome 22.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
			"Firefox 12.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:12.0) Gecko/20120403211507 Firefox/12.0",
			"Chrome 15.0" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.04 Chromium/15.0.871.0 Chrome/15.0.871.0 Safari/535.2",
			"Firefox 4.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:2.0) Gecko/20110307 Firefox/4.0",
			"Chrome 4.0" : "Mozilla/5.0 (X11; U; Slackware Linux x86_64; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.30 Safari/532.5",
			"Firefox 3.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:1.9) Gecko/2008060309 Firefox/3.0",
			"Chrome 3.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.24 Safari/532.0",
			"Firefox 1.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:1.7.6) Gecko/20050405 Firefox/1.0",
			"Chrome 1.0" : "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.39 Safari/525.19"
		}],
		"macos" : ["Mac OS", {
			"Yosemite 10.10" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Mavericks 10.9" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Mountain Lion 10.8" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Lion 10.7" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Snow Leopard 10.6" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Leopard 10.5" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Tiger 10.4" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.4; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Panther 10.3" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.3; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Jaguar 10.2" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.2; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Puma 10.1" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.1; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Cheetah 10.0" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.0; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Kodiak PB" : "Mozilla/5.0 (Macintosh; Intel Mac OS X PB; rv:31.0) Gecko/20100101 Firefox/31.0"
		}],
		"ios" : ["iOS", {
			"iOS 7.1.1 (iPhone)" : "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53",
			"iOS 7.1.1 (iPod)" : "Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53",
			"iOS 7.1.1 (iPad)" : "Mozilla/5.0 (iPad; CPU OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53",
			"iOS 7.0 (iPhone)" : "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A501 Safari/8536.25",
			"iOS 7.0 (iPod)" : "Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53",
			"iOS 7.0 (iPad)" : "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A465 Safari/8536.25",
			"iOS 6.0 (iPhone)" : "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25",
			"iOS 6.0 (iPad)" : "Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25",
			"iOS 5.0 (iPhone)" : "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B179 Safari/7534.48.3",
			"iOS 5.0 (iPad)" : "Mozilla/5.0 (iPad; U; CPU iPad OS 5_0_1 like Mac OS X; en-us) AppleWebKit/535.1+ (KHTML like Gecko) Version/7.2.0.0 Safari/6533.18.5",
			"iOS 4.0 (iPhone)" : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5",
			"iOS 4.0 (iPad)" : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/531.22.7",
			"iOS 3.0 (iPhone)" : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
			"iOS 2.0 (iPhone)" : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5H11 Safari/525.20"
		}],
		"win" : ["Windows", {
			"Firefox 31.0" : "Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Chrome 37.0" : "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36",
			"IE 11" : "Mozilla/5.0 (IE 11.0; Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko",
			"Firefox 30" : "Mozilla/5.0 (Windows NT 5.1; rv:30.0) Gecko/20100101 Firefox/30.0",
			"Chrome 36.0" : "Mozilla/5.0 (Windows NT 6.1; WOW64; AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36",
			"IE 10" : "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)",
			"Firefox 25.0" : "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0",
			"Chrome 30.0" : "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36",
			"IE 9" : "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0",
			"Firefox 12.0" : "Mozilla/5.0 (Windows NT 6.1; en-us; rv:12.0) Gecko/20120403211507 Firefox/12.0",
			"Chrome 22.0" : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
			"IE 8" : "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)",
			"Firefox 4.0" : "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)",
			"Chrome 15.0" : "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.861.0 Safari/535.2",
			"IE 6.0" : "Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
			"Firefox 3.0" : "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.0",
			"Chrome 3.0" : "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/531.0 (KHTML, like Gecko) Chrome/3.0.191.0 Safari/531.0"
		}],
		"winph" : ["Windows Phone", {
			"IE 11.0" : "Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; HTC; Windows Phone 8X by HTC) like Gecko",
			"IE 10.0" : "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; ARM; Touch; WPDesktop)",
			"IE 9.0" : "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; XBLWP7; ZuneWP7)",
			"IE 7.0" : "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG; GW910)",
			"IE 6.0" : "Mozilla/4.0 (compatible; MSIE 6.0; Window CE; IEMobile 8.12; MSIEMobile 6.0)",
			"IE 5.0" : "Mozilla/4.0 (compatible; MSIE 5.00; Windows 98)"
		}]
	}],

	/*
	 * function to append items
	 * @param string parent id of parent element
	 * @param string text text to display in item
	 * @param string value value of the item
	 */
	appendItem : function(parent, text, value, selected, disabled){
		parent = document.getElementById(parent);
		var option = document.createElement("option");
		option.text = text;
		option.value = value;
		option.class = "menu item";
		option.selected = selected;
		option.disabled = typeof disabled != "undefined"? disabled : false;
		return parent.add(option);
	},

	/*
	 * building OS List
	 * @param string selectedOS
	 * @param string selectedOSVer
	 */
	buildOSList : function(selectedOS, selectedOSVer){
		var OSList = document.getElementById(this.OS_LIST_ID);
		
		var UAList = JSON.parse(localStorage["uastring"]);
		var OSKeysList = Object.keys(UAList[0]);

		this.appendItem(this.OS_LIST_ID, "Select OS...", "", !selectedOS?true:false, true);
		for(var i=0; i<OSKeysList.length; i++){
			this.appendItem(this.OS_LIST_ID, UAList[0][OSKeysList[i]][0], OSKeysList[i], selectedOS == OSKeysList[i]?true:false);
		}

		OSList.selectedIndex = selectedOS == undefined? 0 : OSList.selectedIndex;
		
		this.buildOSVerList(selectedOS, selectedOSVer);
	},

	/*
	 * building OS Version List
	 * @param string os OS whose versions are to be displayed
	 * @param string selectedOSVer
	 */
	buildOSVerList : function(os, selectedOSVer){
		var OSVerList = document.getElementById(this.OS_VER_LIST_ID);
		while(OSVerList.firstChild)
			OSVerList.removeChild(OSVerList.firstChild);

		if("undefined" == typeof os)
			os="default";

		var UAList = JSON.parse(localStorage["uastring"]);
		var OSVerKeysList = Object.keys(UAList[0][os][1]);

		this.appendItem(this.OS_VER_LIST_ID, "Select OS Version...", "", !selectedOSVer?true:false, true);
		for(var i=0; i<OSVerKeysList.length; i++){
			this.appendItem(this.OS_VER_LIST_ID, OSVerKeysList[i], UAList[0][os][1][OSVerKeysList[i]], selectedOSVer == OSVerKeysList[i]?true:false);
		}

		OSVerList.selectedIndex = selectedOSVer == undefined? 0 : OSVerList.selectedIndex;
	},

	/*
	 * On selection of operating system from the list
	 */
	onOSSelect : function(os, selectedOSVer){
		this.buildOSVerList(os, selectedOSVer);
	},

	/*
	 * On selection of operating system version from the list
	 */
	onOSVerSelect : function(ua){
		var oslist = document.getElementById(this.OS_LIST_ID);
		var osverlist = document.getElementById(this.OS_VER_LIST_ID);
		var os = oslist.options[oslist.selectedIndex].text;
		var osId = oslist.value;
		var osVer = osverlist.options[osverlist.selectedIndex].text;
		localStorage["currentUA"] = '{"os" : "' + os + '", "osid" : "' + osId + '", "osver" : "' + osVer + '", "ua" : "' + ua + '"}';
	},

	toggleState : function(checked){
		if(typeof checked != "undefined")
			localStorage["enabled"] = !checked;
		else
			localStorage["enabled"] = typeof localStorage["enabled"] != "undefined" ? !localStorage["enabled"] : false;
	}
};

AnonifyBrowser.firstrun = {
	onInstall : function() {
		console.log("Extension Installed");
	},

	onUpdate : function() {
		console.log("Extension Updated");
	},

	getVersion : function() {
		var details = chrome.app.getDetails();
		return details.version;
	},

	// Check if the version has changed.
	execute : function(){
		var currVersion = this.getVersion();
		var prevVersion = localStorage['version']
		if (currVersion != prevVersion) {
			// Check if we just installed this extension.
			if (typeof prevVersion == 'undefined') {
				this.onInstall();
			} else {
				this.onUpdate();
			}
			localStorage['uastring'] = JSON.stringify(AnonifyBrowser.Interface.UAString);
			localStorage['version'] = currVersion;
		}
	}
};

document.addEventListener('DOMContentLoaded', function(){
	AnonifyBrowser.firstrun.execute();
	var selectedOS = undefined;
	var selectedOSVer = undefined;

	if("undefined" != typeof localStorage["currentUA"]){
		var currentUA = JSON.parse(localStorage["currentUA"]);
		selectedOS = currentUA.osid;
		selectedOSVer = currentUA.osver;
	}
	AnonifyBrowser.Interface.buildOSList(selectedOS, selectedOSVer);
	$('.ui.checkbox').checkbox();

	document.getElementById(AnonifyBrowser.Interface.OS_LIST_ID).addEventListener("change", function(){
		AnonifyBrowser.Interface.onOSSelect(this.value);
	});
	document.getElementById(AnonifyBrowser.Interface.OS_VER_LIST_ID).addEventListener("change", function(){
		AnonifyBrowser.Interface.onOSVerSelect(this.value);
	});
	console.log(document.getElementById(AnonifyBrowser.Interface.TRIGGER_ID).checked);
	document.getElementById(AnonifyBrowser.Interface.TRIGGER_ID).addEventListener("change", function(){
		AnonifyBrowser.Interface.toggleState(this.checked);
	});
});