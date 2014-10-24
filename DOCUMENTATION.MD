Add and Edit Modal
--------------------
What I want to do?
-> Submit changes and additions in add and delete modals.

How to do it?
-> Give id to only those fields which are being edited and for rest no id
-> Additional "data-type" attribute is set to "add" or "edit" according to requirement
-> Set name of the version input to version-name
-> Set name of the UA String input to ua-string
-> Submission occurs through footer buttons. On click on "Sure" button, edit/delete form gets submitted and modal gets closed. On click on "Nay" button, modal gets closed.
-> On submission check for all inputs in form using for loop with +2 increment. Those with "data-type" attribute as "add" get a custom id and those with "data-type" attribute as "edit" will have id as os version id.
----------------------------------------
Done
----------------------------------------
Next :
VALIDATION OF EDITTED AND DELETED UAs - Done
----------------------------------------
To do list :
· Make Add More feature working
√ Color code fields according to errors
√ Display an error message signifying which color represents which type of error
· On submit, fields that are submitted successfully are to be hidden and fields with errors are to shown only.
· Trigger a "select" event whenever OS Version selection list is affected anyhow, when in turn executed bound functions - Updating Selection list, Updating count of selected versions, updating status of buttons bar, updating status of footer button, updating status of message bar
· On modal close, update OS Version list
· On OS Select, 
· Create functions:
 -> to update selection list
   -> to reset selections
 -> to update count of selected OS Versions
 -> to update visibility of button bar
   -> to toggle visibility of button bar
 -> to update visibility of footer button
   -> to toggle visibility of footer button
 -> to update status of message bar
   -> to check for valid OS
   -> to check for no. of OS Versions
   -> to generate message
   -> to display message
 -> to bind an event to perform required tasks on OS Select
 -> to bind an event to perform required update tasks on "select" event
 -> to bind an event to perform required update tasks on "modal" close
   -> to refresh page using selected OS
     -> to reset all selections(triggers "select" event)