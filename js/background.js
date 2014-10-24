/*
 * Defining namespace for addon JS
 */
if ("undefined" == typeof(AnonifyBrowser)) {
	var AnonifyBrowser = {};
};

AnonifyBrowser.Extras = {
	searchJSONKeys: function self(JSONObject, pattern){
		var results = [];
		var keys = Object.keys(JSONObject);
		for(var i = 0; i < keys.length; i++){
			if(pattern.test(keys[i])) {
				results = results.concat(keys[i]);
			}
			if(typeof JSONObject[keys[i]] == "object"){
				results = results.concat(self(JSONObject[keys[i]], pattern));
			}
		}
		return results;
	}/*,
	replaceKeys: function(JSONObject, pattern, replacePattern){
		var keys = Object.Keys(JSONObject);
		for(var i = 0; i < keys.length; keys++){
			if(pattern.test(keys[i])) {
				results.concat(keys[i]);
			}
			if(typeof JSONObject[keys[i]] == "object"){
				results.concat(searchJSONKeys(JSONObject[keys[i]], pattern));
			}
		}
		return results;
	}*/
};

AnonifyBrowser.userAgents = {
	/*
	 * UA String list
	 */
	UAString : [{
		"default" : ["Default", {
			"default" : [
				"Default", "default"]
		}],
		"android" : ["Android", {
			"cup1_5" : [
				"Cupcake 1.5", "Mozilla/5.0 (Linux; U; Android 1.5; en-us; T-Mobile G1 Build/CRC1) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
			"dn1_6" : [
			 	"Doughnut 1.6", "Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC Magic Build/DRC92) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1"],
			"ecl2_0" : [
				"Eclair 2.0", "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/ 530.17"],
			"ecl2_0_1" : [
				"Eclair 2.0.1", "Mozilla/5.0 (Linux; U; Android 2.0.1; en-us; Droid Build/ESD56) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17"],
			"ecl2_1" : [
				"Eclair 2.1", "Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17"],
			"fr2_2" : [
				"Froyo 2.2", "Mozilla/5.0 (Linux; U; Android 2.2; en-us; ViewPad7 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			"gb2_3" : [
				"Gingerbread 2.3", "Mozilla/5.0 (Linux; U;Android 2.3.7; en-us; Nexus One Build/ERD62) AppleWebKit/533.1 (KHTML,like Gecko) Version/4.0 Mobile Safari/533.1"],
			"gb2_3_6" : [
				"Gingerbread 2.3.6", "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; LG-E400 Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			"gb2_3_7" : [
				"Gingerbread 2.3.7", "Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; LG-E400 Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
			"hc3_0" : [
				"Honeycomb 3.0", "Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"],
			"ics4_0" : [
				"Icecream Sandwich 4.0", "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-P5100 Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			"ics4_0_3" : [
				"Icecream Sandwich 4.0.3", "Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			"ics4_0_4" : [
				"Icecream Sandwich 4.0.4", "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 Mobile Safari/535.19"],
			"jb4_1" : [
				"Jelly Bean 4.1", "Mozilla/5.0 (Linux; U; Android 4.1; en-gb; Build/JRN84D) AppleWebKit/534.30 (KHTML like Gecko) Version/4.0 Mobile Safari/534.30"],
			"jb4_1_1" : [
				"Jelly Bean 4.1.1", "Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Nexus S Build/JRO03E) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
			"jb4_2" : [
				"Jelly Bean 4.2", "Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30"],
			"jb4_3" : [
				"Jelly Bean 4.3", "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.111 Safari/537.36"],
			"kk4_4" : [
				"Kitkat 4.4", "Mozilla/5.0 (Linux; Android 4.4; Nexus 7 Build/KOT24) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.105 Safari/537.36"]
		}],
		"bbos" : ["BlackBerry OS", {
			"bb9700" : [
				"BlackBerry 9700", "BlackBerry9700/5.0.0.862 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/331 UNTRUSTED/1.0 3gpp-gba"],
			"bb9800" : [
				"BlackBerry 9800", "Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.450 Mobile Safari/534.8+"],
			"bb10_touch" : [
				"BB10 Touch", "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.1.0.4633 Mobile Safari/537.10+"],
			"bb10_key" : [
				"BB10 Keypad", "Mozilla/5.0 (BB10; Kbd) AppleWebKit/537.35+ (KHTML, like Gecko) Version/10.2.1.1925 Mobile Safari/537.35+"]
		}],
		"linux" : ["Linux", {
			"ff31_0" : [
				"Firefox 31.0", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"cr_gen" : [
				"Chrome (Generic)", "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/530.5 (KHTML, like Gecko) Chrome/ Safari/530.5"],
			"cr37_0" : [
				"Chrome 37.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36"],
			"ff30_0" : [
				"Firefox 30.0", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:30.0) Gecko/20120101 Firefox/30.0"],
			"cr36_0" : [
				"Chrome 36.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36"],
			"ff29_0" : [
				"Firefox 29.0", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20120101 Firefox/29.0"],
			"cr35_0" : [
				"Chrome 35.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36"],
			"ff25_0" : [
				"Firefox 25.0", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:25.0) Gecko/20100101 Firefox/25.0"],
			"cr30_0" : [
				"Chrome 30.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36"],
			"ff21_0" : [
				"Firefox 21.0", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:21.0) Gecko/20130331 Firefox/21.0"],
			"cr22_0" : [
				"Chrome 22.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1"],
			"ff12_0" : [
				"Firefox 12.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:12.0) Gecko/20120403211507 Firefox/12.0"],
			"cr15_0" : [
				"Chrome 15.0", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.04 Chromium/15.0.871.0 Chrome/15.0.871.0 Safari/535.2"],
			"ff4_0" : [
				"Firefox 4.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:2.0) Gecko/20110307 Firefox/4.0"],
			"cr4_0" : [
				"Chrome 4.0", "Mozilla/5.0 (X11; U; Slackware Linux x86_64; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.30 Safari/532.5"],
			"ff3_0" : [
				"Firefox 3.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:1.9) Gecko/2008060309 Firefox/3.0"],
			"cr3_0" : [
				"Chrome 3.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.24 Safari/532.0"],
			"ff1_0" : [
				"Firefox 1.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-us; rv:1.7.6) Gecko/20050405 Firefox/1.0"],
			"cr1_0" : [
				"Chrome 1.0", "Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.39 Safari/525.19"]
		}],
		"macos" : ["Mac OS", {
			"ym10_10" : [
				"Yosemite 10.10", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"mav10_9" : [
				"Mavericks 10.9", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"ml10_8" : [
				"Mountain Lion 10.8", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"lion10_7" : [
				"Lion 10.7", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"sl10_6" : [
				"Snow Leopard 10.6", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"leo10_5" : [
				"Leopard 10.5", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"tiger10_4" : [
				"Tiger 10.4", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.4; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"panther10_3" : [
				"Panther 10.3", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.3; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"jaguar10_2" : [
				"Jaguar 10.2", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.2; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"puma10_1" : [
				"Puma 10.1", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.1; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"cheetah10_0" : [
				"Cheetah 10.0", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.0; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"kodiak" : [
				"Kodiak PB", "Mozilla/5.0 (Macintosh; Intel Mac OS X PB; rv:31.0) Gecko/20100101 Firefox/31.0"]
		}],
		"ios" : ["iOS", {
			"ios7_1_1_iph" : [
				"iOS 7.1.1 (iPhone)", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
			"ios7_1_1_ip" : [
				"iOS 7.1.1 (iPod)", "Mozilla/5.0 (iPod touch; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
			"ios7_1_1_ipa" : [
				"iOS 7.1.1 (iPad)", "Mozilla/5.0 (iPad; CPU OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D201 Safari/9537.53"],
			"ios7_0_iph" : [
				"iOS 7.0 (iPhone)", "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_2 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A501 Safari/8536.25"],
			"ios7_0_ip" : [
				"iOS 7.0 (iPod)", "Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53"],
			"ios7_0_ipa" : [
				"iOS 7.0 (iPad)", "Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.16 Mobile/11A465 Safari/8536.25"],
			"ios6_0_iph" : [
				"iOS 6.0 (iPhone)", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A405 Safari/8536.25"],
			"ios6_0_ipa" : [
				"iOS 6.0 (iPad)", "Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25"],
			"ios5_0_iph" : [
				"iOS 5.0 (iPhone)", "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B179 Safari/7534.48.3"],
			"ios5_0_ipa" : [
				"iOS 5.0 (iPad)", "Mozilla/5.0 (iPad; U; CPU iPad OS 5_0_1 like Mac OS X; en-us) AppleWebKit/535.1+ (KHTML like Gecko) Version/7.2.0.0 Safari/6533.18.5"],
			"ios4_0_iph" : [
				"iOS 4.0 (iPhone)", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5"],
			"ios4_0_ipa" : [
				"iOS 4.0 (iPad)", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/531.22.7"],
			"ios3_0_iph" : [
				"iOS 3.0 (iPhone)", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16"],
			"ios2_0_iph" : [
				"iOS 2.0 (iPhone)", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5H11 Safari/525.20"]
		}],
		"win" : ["Windows", {
			"ff31_0" : [
				"Firefox 31.0", "Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0"],
			"cr37_0" : [
				"Chrome 37.0", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36"],
			"ie_11" : [
				"IE 11", "Mozilla/5.0 (IE 11.0; Windows NT 6.3; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko"],
			"ff30_0" : [
				"Firefox 30", "Mozilla/5.0 (Windows NT 5.1; rv:30.0) Gecko/20100101 Firefox/30.0"],
			"cr36_0" : [
				"Chrome 36.0", "Mozilla/5.0 (Windows NT 6.1; WOW64; AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36"],
			"ff31_0" : [
				"IE 10", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)"],
			"ff25_0" : [
				"Firefox 25.0", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0"],
			"cr30_0" : [
				"Chrome 30.0", "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36"],
			"ie_9" : [
				"IE 9", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0"],
			"ff12_0" : [
				"Firefox 12.0", "Mozilla/5.0 (Windows NT 6.1; en-us; rv:12.0) Gecko/20120403211507 Firefox/12.0"],
			"cr22_0" : [
				"Chrome 22.0", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1"],
			"ie_8" : [
				"IE 8", "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)"],
			"ff4_0" : [
				"Firefox 4.0", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)"],
			"cr15_0" : [
				"Chrome 15.0", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.861.0 Safari/535.2"],
			"ie6_0" : [
				"IE 6.0", "Mozilla/5.0 (Windows; U; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)"],
			"ff3_0" : [
				"Firefox 3.0", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.0"],
			"cr3_0" : [
				"Chrome 3.0", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/531.0 (KHTML, like Gecko) Chrome/3.0.191.0 Safari/531.0"]
		}],
		"winph" : ["Windows Phone", {
			"ie11_0" : [
				"IE 11.0", "Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; HTC; Windows Phone 8X by HTC) like Gecko"],
			"ie10_0" : [
				"IE 10.0", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; ARM; Touch; WPDesktop)"],
			"ie9_0" : [
				"IE 9.0", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; XBLWP7; ZuneWP7)"],
			"ie7_0" : [
				"IE 7.0", "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG; GW910)"],
			"ie6_0" : [
				"IE 6.0", "Mozilla/4.0 (compatible; MSIE 6.0; Window CE; IEMobile 8.12; MSIEMobile 6.0)"],
			"ie5_0" : [
				"IE 5.0", "Mozilla/4.0 (compatible; MSIE 5.00; Windows 98)"]
		}]
	}],
	getList: function(os, id){
		if(typeof id == "undefined") {
			if(typeof os == "undefined") {
				return JSON.parse(localStorage["uastring"]);
			} else {
				return JSON.parse(localStorage["uastring"])[os][1];
			}
		} else {
			return JSON.parse(localStorage["uastring"])[os][1][id][1];
		}
	},
	addOS: function(overwrite, osname, id) {
		var UAList = JSON.parse(localStorage["uastring"]);
		osname = osname.trim();
		if(overwrite || typeof id == "undefined") {
			if(this.validateOS(name, ua)) {
				if(!overwrite){
					id = this.getCustomID();
				}

			}
		}
	},
	addToList: function(os, id, name, ua, overwrite){
		var UAList = JSON.parse(localStorage["uastring"]);
		if(typeof name != "undefined")
			name = name.trim();
		if(typeof ua != "undefined")
			ua = ua.trim();

		if(typeof ua == "undefined" && typeof overwrite == "undefined") {
			if(name != "undefined") {
				overwrite = name;
				name = os.trim();
			}
			if(overwrite || typeof UAList[id] == "undefined") {
				if(this.validateUA(name)){
					if(!overwrite)
						id = this.getCustomID();

					UAList[id][0] = name;
					var uastring = JSON.stringify(UAList);
					localStorage["uastring"] = uastring;
					return true;
				}
				else{
					$(".ui.modal").trigger("error", ["add-os", "Invalid characters used in operating system name!"]);
					return [false, "invalid"];
				}
			} else {
				$(".ui.modal").trigger("error", ["add-os", "Please input a unique operating system ID."]);
				return [false, "unique"];
			}
		} else {
			//alert(os + " " + id + " " + name + " " + ua + " " + overwrite);
			if(typeof UAList[os] != "undefined") {
				if(typeof UAList[os][1][id] == "undefined" || overwrite) {
					//alert("change");
					if(this.validateUA(name, ua)){
						if(!overwrite){
							id = this.getCustomID();
						}
					
						UAList[os][1][id] = [name, ua];
						var uastring = JSON.stringify(UAList);
						localStorage["uastring"] = uastring;
						return true;
					} else{
						$(".ui.modal").trigger("error", ["add-user-agent", "Invalid characters used in user-agent name!"]);
						return [false, "invalid"];
					}
				} else {
					$(".ui.modal").trigger("error", ["add-user-agent", "Please input a unique user-agent ID."]);
					return [false, "unique"];
				}
			} else {
				$(".ui.modal").trigger("error", ["add-user-agent", "Please select an appropriate operating system before adding user-agent."]);
				return [false, "os"];
			}
		}
	},
	removeFromList: function(os, id){
		var UAList = JSON.parse(localStorage["uastring"]);
		if(typeof id == "undefined"){
			if(typeof os == "undefined"){
				UAList = [{}];
			} else {
				delete UAList[os];
			}
		}
		else {
			delete UAList[os][1][id];
		}
		localStorage["uastring"] = JSON.stringify(UAList);
	},
	getCustomID : function(){
		id = parseInt(localStorage["custom"]);
		localStorage["custom"] = id+1;
		return id;
	},
	syncCustom : function(){
		var UAList = JSON.parse(localStorage["uastring"]);
		var customPattern =/^custom\-\d+$/;
		var customList = AnonifyBrowser.Extras.searchJSONKeys(UAList, /^custom\-\d+$/);
		if(customList.length != 0){
			customList.sort(function(a,b){
				return parseInt(a.substring(7)) - parseInt(b.substring(7));
			});
			localStorage["custom"] = parseInt(custom.pop().substring(7));
		} else
			localStorage["custom"] = 0;
	},
	sanitizeText : function(text){
		text = text.trim();
		return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	},
	validateUA : function(name){
		var nameVal = /^(\w|\(|\s|\)|\-|\.)+$/;
		//alert(nameVal.test("("));
		if(nameVal.test(name))
			return true;
		return false;
	},
},
AnonifyBrowser.firstRun = {
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
		var prevVersion = localStorage['version'];
		if (currVersion != prevVersion) {
			// Check if we just installed this extension.
			if (typeof prevVersion == 'undefined') {
				this.onInstall();
			} else {
				this.onUpdate();
			}
			localStorage['uastring'] = JSON.stringify(AnonifyBrowser.userAgents.UAString[0]);
			localStorage['version'] = currVersion;
			localStorage['custom'] = 0;
		} else {
			var id = localStorage["custom"];
			if(isNaN(id)){
				AnonifyBrowser.userAgents.syncCustom();
			}
			try{
				JSON.parse(localStorage["uastring"]);
			} catch(e){
				localStorage['uastring'] = JSON.stringify(AnonifyBrowser.userAgents.UAString[0]);
				localStorage['enabled'] = "false";
			}
		}
	}
};

AnonifyBrowser.firstRun.execute();

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		var ua = JSON.parse(localStorage["currentUA"]).ua;
		var enabled = localStorage["enabled"];
		if(enabled == "true" && ua.toLowerCase() != "default" && ua.length != 0 && typeof ua != "undefined")
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
	}, ["blocking", "requestHeaders"]
);