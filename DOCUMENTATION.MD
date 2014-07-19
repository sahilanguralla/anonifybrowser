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