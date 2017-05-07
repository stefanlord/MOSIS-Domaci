function kontakti(){

function onSuccess(contacts) {
    //alert('Found ' + contacts.length + ' contacts.');
    navigator.contacts.pickContact(function(contact){
    	//alert(contact.displayName);
    	var slika = contact.photos[0].value;
       document.getElementById('LabelaIme').innerHTML = 'Ime : ' + contact.displayName;
        document.getElementById('LabelaBroj').innerHTML = 'Broj : ' + contact.phoneNumbers[0].value;
        document.getElementById("kontakt slika").setAttribute("src", slika);
        console.log('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
        console.log('Error: ' + err);
    });
};

function onError(contactError) {
    alert('onError!');
};

// find all contacts with 'Bob' in any name field  options.filter   = "bob";
var options      = new ContactFindOptions();

options.multiple = true;
options.desiredFields = [navigator.contacts.fieldType.id];
options.hasPhoneNumber = true;
var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
navigator.contacts.find(fields, onSuccess, onError, options);
};
