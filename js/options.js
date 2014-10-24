/*
 * Defining namespace for addon JS
 */
if ("undefined" == typeof(AnonifyBrowser)) {
	var AnonifyBrowser = {};
};

/*
 * Object for Options Page
 */
AnonifyBrowser.Options = {
	// ID for OS Dropdown List div
	OS_ID: "osList",
	// ID for OS Settings dropdown button
	OS_SETTINGS_ID: "os-settings-dropdown-button",
	// ID for Add new OS button
	ADD_OS_ID: "add-os-button",
	// ID for OS Dropdown Input tag
	OS_LIST_ID: "os-dropdown-list",
	// ID for OS Version list table
	OS_VER_LIST_ID: "os-ver-tbody",
	// ID for the OS Version List footer containing 'Add More UA' button
	OS_VER_LIST_FOOT: "os-ver-tfoot",
	// ID for hidden input containing values of selected OS Versions
	SELECTION_LIST_ID: "selected-os-ver-list",
	// ID for hidden input containing no. of selected OS Versions
	SELECTION_COUNT_ID: "selected-os-ver-count",
	// ID for the bar containing EDIT, DELETE and ADD buttons above OS Version Table
	BUTTONS_BAR_ID: "edit-remove-buttons",
	// ID for EDIT button in button bar
	EDIT_BUTTON: "edit-button",
	// ID for DELETE button in button bar
	DELETE_BUTTON: "delete-button",
	// ID for ADD button in button bar
	ADD_BUTTON: "add-button",
	// ID for ADD UA button in OS Version Table footer
	ADD_UA_BUTTON: "add-ua-button",
	// ID for the Message box that display errors
	MESSAGE_ID: "display-message",
	/*
	 * return selected OS from dropdown list
	 */
	getOS: function(){
		return $("[id='" + AnonifyBrowser.Options.OS_ID + "']").dropdown("get value");
	},
	/*
	 * appends a text message in parent field
	 * @param parent string node in which you want to append message
	 * @param text string text to display in message
	 * @param value string
	 */
	appendItem: function(parent, text, value){
		parent = document.getElementById(parent);
		var node = document.createElement("div");
		node.setAttribute("class", "item");
		node.setAttribute("data-value", value);
		node.appendChild(document.createTextNode(text));
		parent.appendChild(node);
	},
	/*
	 * appends a table row in parent row(table)
	 * @param parent string node(table) in which row is to be appended
	 * @param text string text to display in row
	 * @param value string id of the row (useful in selecting row)
	 */
	appendRow: function(parent, text, value){
		parent = document.getElementById(parent);
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		tr.setAttribute("id", value);
		td.appendChild(document.createTextNode(text));
		tr.appendChild(td);
		parent.appendChild(tr);
	},
	/*
	 * builds OS dropdown list by adding available OS
	 */
	buildOSList: function(){
		var UAList = JSON.parse(localStorage["uastring"]);
		var OSKeysList = Object.keys(UAList);
		for(var i=0; i<OSKeysList.length; i++){
			if(OSKeysList[i] != "default")
				this.appendItem(this.OS_LIST_ID, UAList[OSKeysList[i]][0], OSKeysList[i]);
		}
	},
	/*
	 * generates list of OS Version under provided OS
	 * @param os string name of the operating system for which OS Version list is to be generated
	 */
	buildOSVerList: function(os){
		var OSVerList = document.getElementById(this.OS_VER_LIST_ID);
		while(OSVerList.firstChild)
			OSVerList.removeChild(OSVerList.firstChild);

		var UAList = JSON.parse(localStorage["uastring"]);
		var OSVerKeysList = Object.keys(UAList[os][1]);
		for(var i=0; i<OSVerKeysList.length; i++){
			this.appendRow(this.OS_VER_LIST_ID, UAList[os][1][OSVerKeysList[i]][0], OSVerKeysList[i]);
		}
	},
	/*
	 * Clears the error message displayed
	 */
	clearMessage: function(){
		var section = document.getElementById(this.MESSAGE_ID);
		while(section.firstChild)
			section.removeChild(section.firstChild);
	},
	/*
	 * generates and displays the message
	 * @param heading string Title describing the message
	 * @param message string brief description of error
	 * @param color string background color of the message
	 * @param icon string icon to be displayed for message
	 */
	displayMessage: function(display, heading, message, color, icon) {
		var section = document.getElementById(this.MESSAGE_ID);
		if(!display)
			$("[id='" + this.MESSAGE_ID + "']").css("display", "none");
		else {
			var cover = document.createElement("div");
			var header = document.createElement("div");
			header.setAttribute("class", "header");
			header.appendChild(document.createTextNode(heading));
			var p = document.createElement("p");
			p.appendChild(document.createTextNode(message));
			if(icon == undefined){
				cover.appendChild(header);
				cover.appendChild(p);
				cover.setAttribute("class", "ui " + color + " message");
			}
			else {
				var icon = document.createElement("i");
				icon.setAttribute("class", icon+" icon");
				var content = document.createElement("div");
				content.setAttribute("class", "content");
				content.appendChild(header);
				content.appendChild(p);
				cover.appendChild(icon);
				cover.appendChild(content);
				cover.setAttribute("ui icon "+color+" message");
			}
			section.insertBefore(cover, section.firstChild);
			$("[id='"+this.MESSAGE_ID+"']").css("display", "initial");
		}
	},
	/*
	 * toggles selection of the OS Version
	 * @param parent string id of the row on which toggle selection is to be performed
	 */
	toggleSelect: function(id){
		$("[id='" + id + "']").toggleClass("positive selected");
		$("[id='" + id + "'] td").toggleClass("positive");
		$("[id='" + this.OS_VER_LIST_ID + "']").change();
	},
	/*
	 * resets the selection of the OS versions
	 * @param except string id of the row that will remain unaffected
	 */
	resetSelection: function(except){
		$("[id='"+this.OS_VER_LIST_ID+"'] tr[id!='"+except+"']").removeClass("positive selected");
		$("[id='"+this.OS_VER_LIST_ID+"'] tr[id!='"+except+"'] td").removeClass("positive");
		
		$("[id='"+AnonifyBrowser.Options.OS_VER_LIST_ID+"']").change();
	},
	/*
	 * Operation performed when user uses shift key for selection
	 * @param parent string node upto which selection is to be carried out
	 */
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
	/*
	 * binds the selection events on all rows of OS Versions table
	 */
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
	/* 
	 * function that toggles the visibility of buttons depending upon state of button
	 * @param state boolean state to which buttons bar visibility is to be changed
	 */
	toggleButtons: function(state){
		if(typeof state != "undefined" && typeof state == "boolean")
			$("[id='" + this.BUTTONS_BAR_ID + "']").css("display",state?"initial":"none");
		else
			$("[id='" + this.BUTTONS_BAR_ID + "']").css("display", ($("[id='"+this.BUTTONS_BAR_ID+"']").css("display") == "none" ? "initial" : "none"));
	},
	/* 
	 * function that toggles the visibility of the footer containing add more UA button
	 * @param state boolean state to which footer visibility is to be changed
	 */
	toggleFooter: function(state){
		if(typeof state != "undefined" && typeof state == "boolean")
			$("[id='"+this.OS_VER_LIST_FOOT+"']").css("display", state? "initial" : "none");
		else
			$("[id='"+this.OS_VER_LIST_FOOT+"']").css("display", ($("[id='"+this.OS_VER_LIST_FOOT+"']").css("display") == "none" ? "initial" : "none"));
	},
	/*
	 * updates footer visibility according to selection of OS (hide for invalid or no OS selection)
	 * @param os string OS that is selected
	 */
	updateFooter: function(os){
		var UAList = JSON.parse(localStorage["uastring"]);
		os = UAList[os];
		if(typeof os == "undefined" || os == "")
			this.toggleFooter(false);
		else
			this.toggleFooter(true);
	},
	/*
	 * updates button bar visibilty according to no. of OS Versions selected
	 */ 
	updateButtons: function(){
		var n = this.getSelectionList().length;
		this.toggleButtons(n>0);
	},
	/*
	 * get list of selected OS Versions
	 * @return array list of selected OS Versions
	 */
	getSelectionList: function(){
		var selectionList = $("[id='" + this.SELECTION_LIST_ID + "']").val();
		if(selectionList.length <1)
			return [];
		return selectionList.split(";;");
	},
	/*
	 * updates list of selected OS Versions
	 */
	updateSelectionList: function(){
		var selected = $("[id='" + this.OS_VER_LIST_ID + "'] tr.selected").map(function(){
			return this.id;
		}).get();
		$("[id='" + this.SELECTION_LIST_ID + "']").val(selected.join(";;"));
		var n = selected.length;
		$("[id='" + this.SELECTION_COUNT_ID + "']").val(n);
	},
	/*
	 * function generates list of OS Versions according to OS selected
	 * @param os string OS whose list is to be generated
	 */
	onOSSelect: function(os){
		this.buildOSVerList(os);
		this.clearMessage();
		var n = Object.keys(JSON.parse(localStorage["uastring"])[os][1]).length;
		if(n<1)
			this.displayMessage(true, "No User-Agent found!", "no user-agent added to this category...");
	},
	/*
	 * refreshes list of OS Versions under selected OS and other related fields
	 * @return array list of selected OS Versions
	 */
	refreshOSVerList: function(os){
		if(typeof os == "undefined")
			var os = AnonifyBrowser.Options.getOS();
		AnonifyBrowser.Options.onOSSelect(os);
		AnonifyBrowser.Options.bindSelection();
		AnonifyBrowser.Options.updateFooter(os);
		AnonifyBrowser.Options.updateSelectionList();
		AnonifyBrowser.Options.updateButtons();
	}
};

AnonifyBrowser.Modal = {
	// stores ID of OS edit and delete Modal
	EDIT_OS_MODAL_ID: "os-edit-modal",
	// stores ID of Edit User Agent Modal
	EDIT_MODAL_ID: "ua-edit-modal",
	// stores ID of Delete User Agent Modal
	DELETE_MODAL_ID: "ua-delete-modal",
	// stores ID of YES button on Modals
	YES_BUTTON_ID: "yes-button",
	// stores ID of NO button on Modals
	NO_BUTTON_ID: "no-button",
	// stores ID of ADD MORE button on ADD and EDIT User Agent Modals
	ADD_MORE_BUTTON_ID: "add-more-button",
	/*
	 * function sets header of the any modal
	 * @param modal string 
	 */
	setHeader: function(modal, text){
		$("[id='" + modal + "'] .header").first().text(text);
	},
	bindChange: function(field, value){
		if(field.value.trim() != value.trim()){
			field.setAttribute("class", "changed");
		}
		else if(field.value.length == 0){
			field.value = value;
			field.setAttribute("class", "");
		}
		else
			field.setAttribute("class", "");
	},
	bindError: function(field, value, errorType){
		if(field.value == value){
			if(errorType == "invalid")
				var className = "errorInvalid";
			else if(errorType == "unique")
				var className = "errorUnique";
			field.setAttribute("class", className);
		}
	},
	createMessage: function(head, desc){
		var message = document.createElement("div");
		message.setAttribute("class", "ui error message");
		var icon = document.createElement("i");
		icon.setAttribute("class", "close icon");

		$(icon).on('click', function() {
		  $(this).closest('.message').fadeOut();
		});

		var header = document.createElement("div");
		header.setAttribute("class", "header");
		header.appendChild(document.createTextNode(head));
		var p = document.createElement("p");
		p = $(p).html(desc);
		p = p.get(0);;
		message.appendChild(icon);
		message.appendChild(header);
		message.appendChild(p);
		return message;
	},
	displayError: function(id, errorHead, errorDesc){
		var error = $("[id=\""+id+"\"] .content [name=\"notify\"]");
		error.append(this.createMessage(errorHead, errorDesc));
	},
	createOSInputFields: function(id, name){
		if(typeof name == "undefined")
		{
			name = "";
			type = "add";
		} else
			type = "edit";

		if(typeof id == "undefined"){
			id = 0;
		}

		var field = document.createElement("div");
		field.setAttribute("class", "field");
			var label = document.createElement("label");
			label.appendChild(document.createTextNode("Operating System Name"));
			var OSNameInput = document.createElement("input");
			OSNameInput.setAttribute("placeholder", "OS name goes here...");
			OSNameInput.setAttribute("type", "text");
			OSNameInput.setAttribute("id", "os-name-" + id);
			OSNameInput.setAttribute("data-defaultValue", name);
			OSNameInput.setAttribute("data-type", type);
			OSNameInput.setAttribute("value", name);
			OSNameInput.addEventListener("blur", function(){
				AnonifyBrowser.Modal.bindChange(this, name);
			});
			OSNameInput.addEventListener("keyup", function(){
				AnonifyBrowser.Modal.bindChange(this, name);
			});
		field.appendChild(label);
		field.appendChild(OSNameInput);

		return field;
	},
	createInputFields: function(id, name, value){
		if(typeof name == "undefined" || typeof value == "undefined")
		{
			name = "";
			value = "";
			type = "add";
		} else
			type = "edit";

		if(typeof id == "undefined"){
			var id = parseInt(document.getElementById("custom-id").value);
			document.getElementById("custom-id").value = id + 1;
		}
		
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
				versionNameInput.setAttribute("data-type", type);
				versionNameInput.setAttribute("value", name);
				versionNameInput.addEventListener("blur", function(){
					AnonifyBrowser.Modal.bindChange(this, name);
				});
				versionNameInput.addEventListener("keyup", function(){
					AnonifyBrowser.Modal.bindChange(this, name);
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
				userAgentInput.setAttribute("data-type", type);
				userAgentInput.setAttribute("value", value);
				userAgentInput.addEventListener("change", function(){
					AnonifyBrowser.Modal.bindChange(this, value);
				});
				userAgentInput.addEventListener("keyup", function(){
					AnonifyBrowser.Modal.bindChange(this, value);
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
			
			var customID = document.createElement("input");
			customID.setAttribute("type", "hidden");
			customID.setAttribute("value", 0);
			customID.setAttribute("id", "custom-id");
			content.appendChild(customID);
			var form = document.createElement("form");
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
						var name = UAList[selectedOS][1][list[i]][0];
						var value = UAList[selectedOS][1][list[i]][1];
						//alert(id+ " "+ name + " " + value);
						segment.appendChild(this.createInputFields(id,name,value));
					}
				}

				var button = document.createElement("div");
				button.setAttribute("class", "ui labeled icon button");
					var icon = document.createElement("i");
					icon.setAttribute("class", "add icon");
				button.appendChild(icon);
				button.appendChild(document.createTextNode("Add More"));
				button.addEventListener("click", function() {
					segment.appendChild(AnonifyBrowser.Modal.createInputFields());
				});

				var notify = document.createElement("div");
				notify.setAttribute("name", "notify");
				notify.setAttribute("class", "notify");

			form.appendChild(message);
			form.appendChild(segment);
			form.appendChild(button);
			form.appendChild(notify);
			
		content.appendChild(form);
	},
	buildEditOSModalContent: function(id, list){
		var content = $("[id='" + id + "'] .content").get(0);
			
			var form = document.createElement("form");
				var segment = document.createElement("div");
				segment.setAttribute("class", "ui form segment");
				if(list == undefined)
					segment.appendChild(this.createOSInputFields());
				else {
					var UAList = JSON.parse(localStorage["uastring"]);
					for(var i = 0; i < list.length; i++){
						var id = list[i];
						console.log(id)
						var name = UAList[list[i]][0];
						//alert(id+ " "+ name + " " + value);
						segment.appendChild(this.createOSInputFields(id,name));
					}
				}

				var notify = document.createElement("div");
				notify.setAttribute("name", "notify");
				notify.setAttribute("class", "notify");

			form.appendChild(segment);
			form.appendChild(notify);

		content.appendChild(form);
	},
	buildDeleteModalContent: function(id, list, os){
		var content = $("[id='" + id + "'] .content").get(0);
			var submitForm = document.createElement("form");
				var message = document.createElement("div");
				message.setAttribute("class", "ui red message");
				var messageHeader = document.createElement("div");
				messageHeader.setAttribute("class", "header");
				messageHeader.appendChild(document.createTextNode("Are you sure?"));
				var messageSubHeader = document.createElement("p");
				if(os)
					var messageSubHeaderText = "You cannot undo this step! Once deleted gone forever!";
				else
					var messageSubHeaderText = "Below is the list of user-agents you wish to delete. If these are custom user-agents (added by you), this is a warning that it cannot be undone!";
				messageSubHeader.appendChild(document.createTextNode(messageSubHeaderText));

				message.appendChild(messageHeader);
				message.appendChild(messageSubHeader);

				var form = document.createElement("div");
				form.setAttribute("class", "ui form segment");

				var UAList = JSON.parse(localStorage["uastring"]);
				var selectedOS = AnonifyBrowser.Options.getOS();
				for(var i = 0; i < list.length; i++){
					var id = list[i];
					if(os)
						var text = UAList[list[i]][0];
					else
						var text = UAList[selectedOS][1][list[i]][0];
					var listItems = this.createDeleteFields(id, text);
					form.appendChild(listItems);
				}
			submitForm.appendChild(message);
			submitForm.appendChild(form);
		content.appendChild(submitForm);
	},
	clearModal: function(modal){
		$("[id='" + modal + "'] .content").first().empty();
	},
	showEditOSModal: function(add){
		this.clearModal(this.EDIT_OS_MODAL_ID);
		if(add){
			this.setHeader(this.EDIT_OS_MODAL_ID, "Add new Operating System");
			this.buildEditOSModalContent(this.EDIT_OS_MODAL_ID);
		} else {
			this.setHeader(this.EDIT_OS_MODAL_ID, "Edit existing Operating System");
			var os = AnonifyBrowser.Options.getOS();
			this.buildEditOSModalContent(this.EDIT_OS_MODAL_ID, [os]);
		}
		$("[id='" + AnonifyBrowser.Modal.EDIT_OS_MODAL_ID + "']").modal("setting", {
			onApprove : function() {
				var form = $("[id='" + AnonifyBrowser.Modal.EDIT_OS_MODAL_ID + "'] .content form").get(0);
				AnonifyBrowser.Modal.fetchFormInput(form, "editOS");
				var invalidErrors = $(this).find(".content").find(".errorInvalid").length;
		    	var uniqueErrors = $(this).find(".content").find(".errorUnique").length;
		    	if(invalidErrors || uniqueErrors){
		    		if(invalidErrors){
		    			AnonifyBrowser.Modal.displayError(AnonifyBrowser.Modal.EDIT_OS_MODAL_ID, "Invalid Operating System name", "field colored in dark red (&nbsp;<span class=\"errorInvalid\"> &nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;) contains invalid characters!");
		    		}
		    		if(uniqueErrors){
		    			AnonifyBrowser.Modal.displayError(AnonifyBrowser.Modal.EDIT_OS_MODAL_ID, "Operating System already exists", "field colored in light red (&nbsp;<span class=\"errorUnique\">&nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;) don't have unique name!");
		    		}
		    		return false;
		    	}
			}
		}).modal('show');
	},
	showEditModal: function(add, os){
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
		$('[id="'+AnonifyBrowser.Modal.EDIT_MODAL_ID+'"]').modal('setting', {
		    onApprove : function() {
		    	var form = $("[id='" + AnonifyBrowser.Modal.EDIT_MODAL_ID + "'] .content form").get(0);
		    	AnonifyBrowser.Modal.fetchFormInput(form, "edit");
		    	var invalidErrors = $(this).find(".content").find(".errorInvalid").length;
		    	var uniqueErrors = $(this).find(".content").find(".errorUnique").length;
		    	if(invalidErrors || uniqueErrors){
		    		if(invalidErrors){
		    			AnonifyBrowser.Modal.displayError(AnonifyBrowser.Modal.EDIT_MODAL_ID, "Invalid User-Agent Name", "field colored in dark red (&nbsp;<span class=\"errorInvalid\"> &nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;) contains invalid characters!");
		    		}
		    		if(uniqueErrors){
		    			AnonifyBrowser.Modal.displayError(AnonifyBrowser.Modal.EDIT_MODAL_ID, "User-Agent already exists", "field colored in light red (&nbsp;<span class=\"errorUnique\">&nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;) don't have unique name!");
		    		}
		    		return false;
		    	}
		    }
		}).modal('show');
	},
	showDeleteOSModal: function(){
		var os = AnonifyBrowser.Options.getOS();
		AnonifyBrowser.Modal.buildDeleteModalContent(AnonifyBrowser.Modal.EDIT_OS_MODAL_ID, os);
		$("[id='"+AnonifyBrowser.Options.EDIT_OS_MODAL_ID+"']").modal("setting", {
			onApprove: function(){
				var form = $("[id='" + AnonifyBrowser.Modal.EDIT_OS_MODAL_ID + "'] .content form").get(0);
				AnonifyBrowser.Modal.fetchFormInput(form, "deleteOS");
			}
		}).modal('show');
	},
	showDeleteModal: function(){
		this.clearModal(this.DELETE_MODAL_ID);
		this.setHeader(this.DELETE_MODAL_ID, "Delete User-Agent(s)");
		var list = AnonifyBrowser.Options.getSelectionList();
		this.buildDeleteModalContent(this.DELETE_MODAL_ID, list);
		$("[id='" + this.DELETE_MODAL_ID + "']").modal('show');
		$("[id='" + this.DELETE_MODAL_ID + "'] .ui.checkbox").checkbox("enable");
		$('[id="'+ AnonifyBrowser.Modal.DELETE_MODAL_ID + '"]').modal('setting', {
		    onApprove : function() {
		    	var form = $("[id='" + AnonifyBrowser.Modal.DELETE_MODAL_ID + "'] .content form").get(0); 
		    	AnonifyBrowser.Modal.fetchFormInput(form, "delete");
		    }
		});
	},
	fetchFormInput: function(form, type){
		var os = AnonifyBrowser.Options.getOS();
		if(type == "edit"){
			//alert(type);
			var regexVersionName = /^version-name-/;
			var regexUAString = /^user-agent-string-/;
			var UAList = JSON.parse(localStorage["uastring"]);
			$(form).find(".two.fields").each(function(){
				var changed = $(this).find("input").filter(".changed");
				if(changed.length) {
					changed = changed.get(0);
					if(regexVersionName.test(changed.id)){
						//alert(this.id);
						var id = changed.id.substring(13);
						var name = changed.value;
						var ua = document.getElementById("user-agent-string-" + id).value;
					} else if(regexUAString.test(changed.id)){
						var id = changed.id.substring(18);
						var name = changed.value;
						var ua = document.getElementById("version-name-" + id).value;
					}
					// alert(id+" "+name+" "+ua);
					if(changed.getAttribute("data-type") == "edit")
						var overwrite = true;
					else if(changed.getAttribute("data-type") == "add")
						var overwrite = false;
					// alert(os);

					var result = AnonifyBrowser.userAgents.addToList(os, id, name, ua, overwrite);
					if(result[0]){
						// alert("done");
						
					} else{
						// alert("false");
						var errorValue = changed.value;
						AnonifyBrowser.Modal.bindError(changed, errorValue, result[1]);
						changed.addEventListener("keyup", function(){
							AnonifyBrowser.Modal.bindError(this, errorValue, result[1]);
						});
						changed.addEventListener("change", function(){
							AnonifyBrowser.Modal.bindError(this, errorValue, result[1]);
						});
					}
				}
			});
		}
		else if(type == "editOS") {
			$(form).find(".field").each(function(){
				var changed = $(this).find("input").filter(".changed");
				if(changed.length) {
					changed = changed.get(0);
					var regexVersionName = /^os-name-/;
					if(regexVersionName.test(changed.id)){
						id = changed.id.substring(8);
					}
					
					var overwrite = (type == "editOS"? true : false);

					var result = AnonifyBrowser.userAgents.addToList(os);
					if(!result[0]) {
						var errorValue = changed.value;
						AnonifyBrowser.Modal.bindError(changed, errorValue, result[1]);
						changed.addEventListener("keyup", function(){
							AnonifyBrowser.Modal.bindError(this, errorValue, result[1]);
						});
						changed.addEventListener("change", function(){
							AnonifyBrowser.Modal.bindError(this, errorValue, result[1]);
						});
					}
				}
			});
		}
		else if(type == "delete" || type == "deleteOS"){
			$(form).find(".ui.checkbox input[type=\"checkbox\"]").each(function(){
				var id = this.id.substring(7);
				if(type == "deleteOS")
					AnonifyBrowser.userAgents.removeFromList(id);
				else
					AnonifyBrowser.userAgents.removeFromList(os, id);
			});
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
			AnonifyBrowser.Options.refreshOSVerList(value);
		}
	});
	$(".ui.modal").modal({
		onHide: function(){
			AnonifyBrowser.Options.refreshOSVerList();
		}
	});
	$("[id='" + AnonifyBrowser.Options.OS_SETTINGS_ID + "'] i.edit").parent().click(function(){
		AnonifyBrowser.Modal.showEditOSModal();
	});
	$("[id='"+AnonifyBrowser.Options.ADD_OS_ID+"']").click(function(){
		AnonifyBrowser.Modal.showEditOSModal(true);
	});
	$("[id='"+AnonifyBrowser.Options.EDIT_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showEditModal();
	});
	$("[id='"+AnonifyBrowser.Options.DELETE_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showDeleteModal();
	});
	$("[id='"+AnonifyBrowser.Options.ADD_UA_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showEditModal(true);
	})
	$("[id='"+AnonifyBrowser.Options.ADD_BUTTON+"']").click(function(){
		AnonifyBrowser.Modal.showEditModal(true);
	});
	$("[id='"+AnonifyBrowser.Options.OS_VER_LIST_ID+"']").change(function(){
		AnonifyBrowser.Options.updateSelectionList();
	}).trigger("change");
});