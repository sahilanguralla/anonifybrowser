/*
 * Defining namespace for addon JS
 */
if ("undefined" == typeof(AnonifyBrowser)) {
	var AnonifyBrowser = {};
};
$("[id='os-ver-tbody']").on('change',function(e){
	alert("change");
});
AnonifyBrowser.Options = {
	OS_ID: "osList",
	OS_LIST_ID: "os-dropdown-list",
	OS_VER_LIST_ID: "os-ver-tbody",
	OS_VER_LIST_FOOT: "os-ver-tfoot",
	OS_VER_OPTIONS_MODAL: "os-ver-options-modal",
	SELECTION_LIST_ID: "selected-os-ver-list",
	SELECTION_COUNT_ID: "selected-os-ver-count",
	BUTTONS_BAR_ID: "edit-remove-buttons",
	EDIT_BUTTON: "edit-button",
	DELETE_BUTTON: "delete-button",
	ADD_BUTTON: "add-button",
	MESSAGE_ID: "display-message",
	getOS: function(){
		return $("[id='" + AnonifyBrowser.Options.OS_ID + "']").dropdown("get value");
	},
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
	clearMessage: function(){
		var section = document.getElementById(this.MESSAGE_ID);
		while(section.firstChild)
			section.removeChild(section.firstChild);
	},
	displayMessage: function(display, heading, message, color, icon) {
		var section = document.getElementById(this.MESSAGE_ID);
		if(!display)
			$("[id='" + this.MESSAGE_ID + "']").css("display", "none");
		else {
			var cover = document.createElement("div");
			var header = document.createElement("div");
			header.setAttribute("class", "header");
			header.appendChild(document.createTextNode(heading));
			var message = document.createElement("p");
			message.appendChild(document.createTextNode(message));
			if(icon == undefined){
				cover.appendChild(header);
				cover.appendChild(message);
				cover.setAttribute("class", "ui " + color + " message");
			}
			else {
				var icon = document.createElement("i");
				icon.setAttribute("class", icon+" icon");
				var content = document.createElement("div");
				content.setAttribute("class", "content");
				content.appendChild(header);
				content.appendChild(message);
				cover.appendChild(icon);
				cover.appendChild(content);
				cover.setAttribute("ui icon "+color+" message");
			}
			section.insertBefore(cover, section.firstChild);
			$("[id='"+this.MESSAGE_ID+"']").css("display", "initial");
		}
	},
	toggleSelect: function(id){
		$("[id='" + id + "']").toggleClass("positive selected");
		$("[id='" + id + "'] td").toggleClass("positive");
		$("[id='" + this.OS_VER_LIST_ID + "']").change();
	},
	resetSelection: function(except){
		$("[id='"+this.OS_VER_LIST_ID+"'] tr[id!='"+except+"']").removeClass("positive selected");
		$("[id='"+this.OS_VER_LIST_ID+"'] tr[id!='"+except+"'] td").removeClass("positive");
		
		$("[id='"+AnonifyBrowser.Options.OS_VER_LIST_ID+"']").change();
	},
	selectUpto: function(upto){
		var last = document.getElementById(upto);
		while(last && !($("[id='"+last.id+"']").hasClass("positive selected"))){
			$("[id='"+last.id+"']").addClass("positive selected");
			$("[id='"+last.id+"'] td").addClass("positive");
			last = last.previousSibling;
		}
		var next = document.getElementById(upto).nextSibling;
		while(next){
			$("[id='"+next.id+"']").removeClass("positive selected");
			$("[id='"+next.id+"'] td").removeClass("positive");
			next = next.nextSibling;
		}

		$("[id='"+AnonifyBrowser.Options.OS_VER_LIST_ID+"']").change();
	},
	bindSelection: function(){
		var osVerList = document.getElementById(this.OS_VER_LIST_ID);
		$("[id='"+this.OS_VER_LIST_ID+"'] tr").click(function() {
			if(event.shiftKey)
				AnonifyBrowser.Options.selectUpto(this.id);
			else {
				if(!event.ctrlKey) {
					var except = this.id;
					if($("[id='"+AnonifyBrowser.Options.SELECTION_COUNT_ID+"']").val()>1)
						except = undefined;
					AnonifyBrowser.Options.resetSelection(except);
				}
				AnonifyBrowser.Options.toggleSelect(this.id);
			}
			AnonifyBrowser.Options.updateButtons();
		});
	},
	toggleButtons: function(state){
		if(typeof state != "undefined" && typeof state == "boolean")
			$("[id='" + this.BUTTONS_BAR_ID + "']").css("display",state?"initial":"none");
		else
			$("[id='" + this.BUTTONS_BAR_ID + "']").css("display", ($("[id='"+this.BUTTONS_BAR_ID+"']").css("display") == "none" ? "initial" : "none"));
	},
	toggleFooter: function(state){
		if(typeof state != "undefined" && typeof state == "boolean")
			$("[id='"+this.OS_VER_LIST_FOOT+"']").css("display", state? "initial" : "none");
		else
			$("[id='"+this.OS_VER_LIST_FOOT+"']").css("display", ($("[id='"+this.OS_VER_LIST_FOOT+"']").css("display") == "none" ? "initial" : "none"));
	},
	updateFooter: function(os){
		var UAList = JSON.parse(localStorage["uastring"]);
		os = UAList[0][os];
		if(typeof os == "undefined" || os == "")
			this.toggleFooter(false);
		else
			this.toggleFooter(true);
	},
	updateButtons: function(){
		var n = this.getSelectionList().length;
		this.toggleButtons(n>0);
	},
	getSelectionList: function(){
		var selectionList = $("[id='" + this.SELECTION_LIST_ID + "']").val();
		if(selectionList.length <1)
			return [];
		return selectionList.split(";;");
	},
	updateSelectionList: function(){
		var selected = $("[id='" + this.OS_VER_LIST_ID + "'] tr.selected").map(function(){
			return this.id;
		}).get();
		$("[id='" + this.SELECTION_LIST_ID + "']").val(selected.join(";;"));
		var n = selected.length;
		$("[id='" + this.SELECTION_COUNT_ID + "']").val(n);
	},
	onOSSelect: function(os){
		this.buildOSVerList(os);
		this.clearMessage();
		var n = Object.keys(JSON.parse(localStorage["uastring"])[0][os][1]).length;
		if(n<1)
			this.displayMessage(true, "No User-Agent found!", "no user-agent added to this category...");
	}
};

AnonifyBrowser.Modal = {
	EDIT_MODAL_ID: "ua-edit-modal",
	DELETE_MODAL_ID: "ua-delete-modal",
	YES_BUTTON_ID: "yes-button",
	NO_BUTTON_ID: "no-button",
	setHeader: function(modal, text){
		$("[id='" + modal + "'] .header").first().text(text);
	},
	createInputFields: function(id, name, value){
		if(typeof name == "undefined")
			name = "";
		if(typeof value == "undefined")
			value = "";

		var fields = document.createElement("div");
		fields.setAttribute("class", "two fields");

			var field1 = document.createElement("div");
			field1.setAttribute("class", "field");
				var label1 = document.createElement("label");
				label1.appendChild(document.createTextNode("Version Name"));
				var versionNameInput = document.createElement("input");
				versionNameInput.setAttribute("placeholder", "version name goes here...");
				versionNameInput.setAttribute("type", "text");
				versionNameInput.setAttribute("id", "version-name-" + id);
				versionNameInput.setAttribute("data-defaultValue", name);
				versionNameInput.setAttribute("value", name);
				versionNameInput.addEventListener("blur", function(){
					if(this.value.length == 0){
						this.value = name;
						$(this).removeClass("changed");
					}
				});
				versionNameInput.addEventListener("keyup", function(){
					if(this.value.trim() != name.trim())
						$(this).addClass("changed");
					else
						$(this).removeClass("changed");
				});
			field1.appendChild(label1);
			field1.appendChild(versionNameInput);
			
			var field2 = document.createElement("div");
			field2.setAttribute("class", "field");
				var label2 = document.createElement("label");
				label2.appendChild(document.createTextNode("User-Agent String"));
				var userAgentInput = document.createElement("input");
				userAgentInput.setAttribute("placeholder", "user-agent string goes here...");
				userAgentInput.setAttribute("type", "text");
				userAgentInput.setAttribute("id", "user-agent-string-" + id);
				userAgentInput.setAttribute("data-defaultValue", value);
				userAgentInput.setAttribute("value", value);
				userAgentInput.addEventListener("change", function(){
					if(this.value.length == 0){
						this.value = value;
						$(this).removeClass("changed");
					}
				});
				userAgentInput.addEventListener("keyup", function(){
					if(this.value.trim() != value.trim())
						$(this).addClass("changed");
					else
						$(this).removeClass("changed");
				});
			field2.appendChild(label2);
			field2.appendChild(userAgentInput);

		fields.appendChild(field1);
		fields.appendChild(field2);

		return fields;
	},
	createDeleteFields: function(id, name){
		var field = document.createElement("div");
		var checkbox = document.createElement("div");
		var checkboxInput = document.createElement("input");
		var label = document.createElement("label");
		label.appendChild(document.createTextNode(name))
		checkboxInput.setAttribute("type", "checkbox");
		checkboxInput.setAttribute("id", "delete-" + id);
		checkbox.setAttribute("class", "ui checkbox");
		field.setAttribute("class", "inline field");
		checkbox.appendChild(checkboxInput);
		checkbox.appendChild(label);
		field.appendChild(checkbox);

		return field;
	},
	buildEditModalContent: function(id, list){
		var content = $("[id='" + id + "'] .content").get(0);

			var message = document.createElement("div");
			message.setAttribute("class", "ui blue message");

				var messageHeader = document.createElement("div");
				messageHeader.setAttribute("class", "header");
				messageHeader.appendChild(document.createTextNode("Edit existing User-Agents"));
				var messageSubHeader = document.createElement("p");
				messageSubHeader.appendChild(document.createTextNode("Modify versions according to your need but remember that it must follow rules given below :"));
				var messageList = document.createElement("ul");
				messageList.setAttribute("class", "list");
				var messageListItems = [
					"version name must be unique",
					"user-agent string must be unique",
					"version name must not contain special characters"
				];
				for(var i = 0; i < messageListItems.length; i++){
					var listItems = document.createElement("li");
					listItems.appendChild(document.createTextNode(messageListItems[i]));
					messageList.appendChild(listItems);
				}

			message.appendChild(messageHeader);
			message.appendChild(messageSubHeader);
			message.appendChild(messageList);

			var segment = document.createElement("div");
			segment.setAttribute("class", "ui form segment");
			if(list == undefined)
				segment.appendChild(this.createInputFields());
			else{
				var selectedOS = AnonifyBrowser.Options.getOS();
				var selectionList = AnonifyBrowser.Options.getSelectionList();
				var UAList = JSON.parse(localStorage["uastring"]);
				for(var i = 0; i < selectionList.length; i++){
					var id = list[i];
					var name = list[i];
					var value = UAList[0][selectedOS][1][list[i]];
					segment.appendChild(this.createInputFields(id,name,value));
				}
			}

			var button = document.createElement("div");
				var icon = document.createElement("i");
				icon.setAttribute("class", "add icon");
			button.appendChild(icon);
			button.appendChild(document.createTextNode("Add More"));
			button.setAttribute("class", "ui labeled icon button");

		content.appendChild(message);
		content.appendChild(segment);
		content.appendChild(button);
	},
	buildDeleteModalContent: function(id, list){
		var content = $("[id='" + id + "'] .content").get(0);
		
			var message = document.createElement("div");
			message.setAttribute("class", "ui red message");
			var messageHeader = document.createElement("div");
			messageHeader.setAttribute("class", "header");
			messageHeader.appendChild(document.createTextNode("Are you sure?"));
			var messageSubHeader = document.createElement("p");
			messageSubHeader.appendChild(document.createTextNode("Below is the list of user-agents you wish to delete. If these are custom user-agents (added by you), this is a warning that it cannot be undone!"));

			message.appendChild(messageHeader);
			message.appendChild(messageSubHeader);

			var form = document.createElement("div");
			form.setAttribute("class", "ui form segment");

			for(var i = 0; i < list.length; i++){
				var listItems = this.createDeleteFields(list[i], list[i]);
				form.appendChild(listItems);
			}

		content.appendChild(message);
		content.appendChild(form);
	},
	clearModal: function(modal){
		$("[id='" + modal + "'] .content").first().empty();
	},
	showEditModal: function(add){
		this.clearModal(this.EDIT_MODAL_ID);
		if(add){
			this.setHeader(this.EDIT_MODAL_ID, "Add User-Agent(s)");
			this.buildEditModalContent(this.EDIT_MODAL_ID);
		}
		else{
			this.setHeader(this.EDIT_MODAL_ID, "Edit User-Agent(s)");
			var list = AnonifyBrowser.Options.getSelectionList();
			this.buildEditModalContent(this.EDIT_MODAL_ID, list);
		}
		$("[id='" + this.EDIT_MODAL_ID + "']").modal('show');
	},
	showDeleteModal: function(){
		this.clearModal(this.DELETE_MODAL_ID);
		this.setHeader(this.DELETE_MODAL_ID, "Delete User-Agent(s)");
		var list = AnonifyBrowser.Options.getSelectionList();
		this.buildDeleteModalContent(this.DELETE_MODAL_ID, list);
		$("[id='" + this.DELETE_MODAL_ID + "']").modal('show');
		$("[id='" + this.DELETE_MODAL_ID + "'] .ui.checkbox").checkbox("enable");
	},
	bindSubmitButtons: function(id, type){
		$("[id='" + id + "'] [name='" + YES_BUTTON_ID + "']").bind("click", function(){
			$("[id='" + id + "'] .content form").submit();
		});
		$("[id='" + id + "'] [name='" + NO_BUTTON_ID + "']").bind("click", function(){
			$("[id='" + id + "'] .content form").submit();
		});
		$("[id='"+ id + "'] .content form").on("submit",function(){
			event.preventDefault();
			this.fetchFormInput(this, type);
		});
	},
	fetchFormInput: function(form, type){
		if(type == "edit"){
			var regexVersionName = /^version-name-/;
			var regexUAString = /^user-agent-string-/;
			form.filter("input .changed").each(function(){
				if(regexVersionName.test(this)){
					var id = this.id.substring(13);
					var name = this.value;
					var ua = document.getElementById("user-agent-string-" + id).value;
					AnonifyBrowser.Modal.validateFields(name, ua);
				}
				else if(regexUAString.test(this)){
					var id = this.id.substring(18);
					var name = this.value;
					var ua = document.getElementById("version-name-" + id).value;
					if(AnonifyBrowser.Modal.validateFields(name, ua);
				}
			});
		}
		else{

		}
	}
};

$(document).ready(function() {
	AnonifyBrowser.Options.buildOSList();
	$('.demo.menu .item').tab();
	$('.ui.dropdown').dropdown();
	AnonifyBrowser.Options.updateButtons();
	AnonifyBrowser.Options.toggleFooter();
	$("[id='" + AnonifyBrowser.Options.OS_ID + "']").dropdown({
		onChange: function(value){
			AnonifyBrowser.Options.onOSSelect(value);
			AnonifyBrowser.Options.bindSelection();
			AnonifyBrowser.Options.updateFooter(value);
		}
	});
	$("[id='"+AnonifyBrowser.Options.EDIT_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showEditModal();
	});
	$("[id='"+AnonifyBrowser.Options.DELETE_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showDeleteModal();
	});
	$("[id='"+AnonifyBrowser.Options.ADD_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showEditModal(true);
	});
	$("[id='"+AnonifyBrowser.Options.OS_VER_LIST_ID+"']").change(function(){
		AnonifyBrowser.Options.updateSelectionList();
	}).trigger("change");
});