/*
 * Defining namespace for addon JS
 */
if ("undefined" == typeof(AnonifyBrowser)) {
	var AnonifyBrowser = {};
};

AnonifyBrowser.Options = {
	OS_LIST_ID: "os-dropdown-list",
	OS_VER_LIST_ID: "os-ver-tbody",
	appendItem: function(parent, text, value){
		parent = document.getElementById(parent);
		var node = document.createElement("div");
		node.setAttribute("class", "item");
		node.setAttribute("data-value", value);
		node.appendChild(document.createTextNode(text));
		parent.appendChild(node);
	},
	appendRow: function(parent, text, value){
		parent = document.getElementById(parent);
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		tr.setAttribute("id", text);
		td.appendChild(document.createTextNode(text));
		tr.appendChild(td);
		parent.appendChild(tr);
	},
	buildOSList: function(){
		var UAList = JSON.parse(localStorage["uastring"]);
		var OSKeysList = Object.keys(UAList[0]);
		for(var i=0; i<OSKeysList.length; i++){
			if(OSKeysList[i] != "default")
				this.appendItem(this.OS_LIST_ID, UAList[0][OSKeysList[i]][0], OSKeysList[i]);
		}
	},
	buildOSVerList: function(os){
		var OSVerList = document.getElementById(this.OS_VER_LIST_ID);
		while(OSVerList.firstChild)
			OSVerList.removeChild(OSVerList.firstChild);

		var UAList = JSON.parse(localStorage["uastring"]);
		var OSVerKeysList = Object.keys(UAList[0][os][1]);

		for(var i=0; i<OSVerKeysList.length; i++){
			this.appendRow(this.OS_VER_LIST_ID, OSVerKeysList[i], UAList[0][os][1][OSVerKeysList[i]]);
		}
	},
	toggleSelect: function(id){
		$("[id='" + id + "']").toggleClass("positive selected");
	},
	resetSelection: function(except){
		$("[id='"+this.OS_VER_LIST_ID+"'] tr[id!='"+except+"']").removeClass("positive selected");
	},
	selectUpto: function(upto){
		var last = document.getElementById(upto);
		while(last && !($("[id='"+last.id+"']").hasClass("positive selected"))){
			$("[id='"+last.id+"']").addClass("positive selected");
			last = last.previousSibling;
		}
		var next = document.getElementById(upto).nextSibling;
		while(next){
			$("[id='"+next.id+"']").removeClass("positive selected");
			next = next.nextSibling;	
		}
	},
	bindSelection: function(){
		var osVerList = document.getElementById(this.OS_VER_LIST_ID);
		$("[id='"+this.OS_VER_LIST_ID+"'] tr").click(function(){
			if(event.shiftKey)
				AnonifyBrowser.Options.selectUpto(this.id);
			else{
				if(!event.ctrlKey)
					AnonifyBrowser.Options.resetSelection(this.id);
				AnonifyBrowser.Options.toggleSelect(this.id);
			}
			alert($("[id='"+this.OS_VER_LIST_ID+"'] tr").size());
		});
	},
	onOSSelect: function(os){
		this.buildOSVerList(os);
	},
	onOSVerSelect: function(){

	}
};

$(document).ready(function() {
	AnonifyBrowser.Options.buildOSList();
	$('.demo.menu .item').tab();
	$('.ui.dropdown').dropdown();
	$("#osList").dropdown({
		onChange: function(value){
			AnonifyBrowser.Options.onOSSelect(value);
			AnonifyBrowser.Options.bindSelection();
		}
	});
	
	AnonifyBrowser.Options.bindSelection();
});