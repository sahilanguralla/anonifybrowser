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
		var OSKeysList = Object.keys(UAList);

		this.appendItem(this.OS_LIST_ID, "Select OS...", "", !selectedOS?true:false, true);
		for(var i=0; i<OSKeysList.length; i++){
			this.appendItem(this.OS_LIST_ID, UAList[OSKeysList[i]][0], OSKeysList[i], selectedOS == OSKeysList[i]?true:false);
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
		var OSVerKeysList = Object.keys(UAList[os][1]);

		this.appendItem(this.OS_VER_LIST_ID, "Select OS Version...", "", !selectedOSVer?true:false, true);
		for(var i=0; i<OSVerKeysList.length; i++){
			this.appendItem(this.OS_VER_LIST_ID, UAList[os][1][OSVerKeysList[i]][0], UAList[os][1][OSVerKeysList[i]][1], selectedOSVer == OSVerKeysList[i]?true:false);
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
		if(ua == "default"){
			document.getElementById(this.TRIGGER_ID).checked = false;
			this.toggleState(false);
		}
		else
			localStorage["currentUA"] = '{"os" : "' + os + '", "osid" : "' + osId + '", "osver" : "' + osVer + '", "ua" : "' + ua + '"}';
	},

	toggleState : function(checked){
		if(typeof checked == "undefined")
			checked = !(localStorage["enabled"] == "true");
		localStorage["enabled"] = checked;
	}
};

document.addEventListener('DOMContentLoaded', function(){
	var selectedOS = undefined;
	var selectedOSVer = undefined;

	if("undefined" != typeof localStorage["currentUA"]){
		var currentUA = JSON.parse(localStorage["currentUA"]);
		selectedOS = currentUA.osid;
		selectedOSVer = currentUA.osver;
	}
	document.getElementById(AnonifyBrowser.Interface.TRIGGER_ID).checked = (localStorage["enabled"] == "true");
	AnonifyBrowser.Interface.buildOSList(selectedOS, selectedOSVer);
	$('.ui.checkbox').checkbox();

	$("#" + AnonifyBrowser.Interface.TRIGGER_ID).checkbox({
		onChange : function(){
			var enabled = document.getElementById(AnonifyBrowser.Interface.TRIGGER_ID).checked;
			AnonifyBrowser.Interface.toggleState(!enabled);
		}
	});
	document.getElementById(AnonifyBrowser.Interface.OS_LIST_ID).addEventListener("change", function(){
		AnonifyBrowser.Interface.onOSSelect(this.value);
	});
	document.getElementById(AnonifyBrowser.Interface.OS_VER_LIST_ID).addEventListener("change", function(){
		AnonifyBrowser.Interface.onOSVerSelect(this.value);
	});
	document.getElementById("anonifybrowser-tbt-link").addEventListener("click", function(){
		chrome.tabs.create({url : "https://facebook.com/portoftbt"});
	});
});