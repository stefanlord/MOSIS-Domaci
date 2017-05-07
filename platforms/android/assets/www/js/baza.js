
var myDB = undefined;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
            myDB = window.sqlitePlugin.openDatabase({name: "proba.db", location: 'default'});
        }

//var myDB = window.sqlitePlugin.openDatabase({name: "proba.db", location: 'default'});

function createDB(){
myDB.transaction(function(transaction) {
transaction.executeSql('CREATE TABLE IF NOT EXISTS planine (id integer primary key, naziv text, opis text, slika text, latitude text, longitude text)', [],
function(tx, result) {
alert("Table created successfully");
},
function(error) {
alert("Error occurred while creating the table.");
});
});
}

function insertDB(){
myDB.transaction(function(transaction) {
//var executeQuery = "INSERT INTO planine (naziv, opis, slika) VALUES ('lord', 'lepoo','img/photos/1.jpg'), ('lord', 'lepoo','img/photos/2.jpg'), ('lord', 'lepoo','img/photos/3.jpg') , ('lord', 'lepoo','img/photos/4.jpg'), ('lord', 'lepoo','img/photos/5.jpg'), ('lord', 'lepoo','img/photos/6.jpg'), ('lord', 'lepoo','img/photos/7.jpg') , ('lord', 'lepoo','img/photos/8.jpg')";
var executeQuery = "INSERT INTO planine (naziv, opis, slika, latitude, longitude) VALUES ('Zlatibor', 'Kratak opis planine Zlatibor.','Zlatibor', '43.7035401','19.6744531'), ('Tara', 'Kratak opis planine Tara.','Tara', '43.8483368','19.4572553') , ('Kopaonik', 'Kratak opis planine Kopaonik.','Kopaonik', '43.2626902','20.7993336'), ('Kukavica', 'Kratak opis planine Kukavica.','Kukavica', '42.791111','21.946389'), ('Vidojevica', 'Kratak opis planine Vidojevica.','Vidojevica', '43.141389','21.555833')";
transaction.executeSql(executeQuery, []
, function(tx, result) {
alert('Inserted');
},
function(error){
alert('Error occurred');
});
});
}


function selectAllDB(){
myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM planine', [], function (tx, results) {
var len = results.rows.length, i;
alert(len);
//$("#rowCount").append(len);
for (i = 0; i < len; i++){
    document.getElementById("TableData").innerHTML += ("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).naziv+"</td><td>"+results.rows.item(i).opis+"</td></td>"+results.rows.item(i).slika+"</td></tr>");
     //document.getElementById("TableData").appendChild("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>");
    //$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>");
}
}, null);
});
}

function deleteDataDB(id){
    myDB.transaction(function(transaction) {
 var executeQuery = "DELETE FROM prvatabela where id=?";
 transaction.executeSql(executeQuery, [id],
 
//On Success

 function(tx, result) {alert('Delete successfully');},
 
//On Error

 function(error){alert('Something went Wrong');});
 });
}


var islika =0;
var vrednost;
var mapa=true;
function selectPhoto(){
	vrednost=sessionStorage.getItem('id');
myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM planine WHERE naziv=?', [vrednost], function (tx, results) {
	(islika>=4)?(islika=1):(islika++);
	sessionStorage.setItem('slika',islika);
	sessionStorage.setItem('naziv',results.rows.item(0).naziv);
	document.getElementById("LabelaNaziv").innerHTML = results.rows.item(0).naziv;
	document.getElementById("LabelaOpis").innerHTML = results.rows.item(0).opis;
    document.getElementById("slikaBaza").setAttribute("src", "img/"+results.rows.item(0).slika+"/"+islika+".jpg");
	if(mapa){
		getMap(results.rows.item(0).latitude, results.rows.item(0).longitude);
		mapa=false;
	}
}, null);
});
}

function drTable() {
	myDB.transaction(function(transaction) {
 var executeQuery = "DROP TABLE IF EXISTS planine";
 transaction.executeSql(executeQuery, [],
 function(tx, result) {alert('Table deleted successfully.');},
 function(error){alert('Error occurred while droping the table.');}
 );
 });
}
function updateDB(){
 myDB.transaction(function(transaction) {
 var executeQuery = "UPDATE planine SET latitude='43.179155', longitude='22.175742' WHERE naziv='Suva planina'";
 transaction.executeSql(executeQuery, [],
 
//On Success

 function(tx, result) {alert('Updated successfully');},
 
//On Error

 function(error){alert('Something went Wrong');});
 });
}
function bazaDugmici(){
myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM planine', [], function (tx, results) {
	var len = results.rows.length, i;
for (i = 0; i < len; i++)
     document.getElementById("dugmici").innerHTML += ("<button type='button' onclick='bazaPregled()' value="+results.rows.item(i).naziv+">"+results.rows.item(i).naziv+"</button><p>");
}, null);
});
}

function nizProba(){
	var locations;
    myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM planine', [], function (tx, results) {
	var len = results.rows.length, i;
	  locations = [];
	  for (i = 0; i < len; i++) locations[i]=[];
for (i = 0; i < len; i++){
     locations[i][0] = results.rows.item(i).naziv;
     locations[i][1] = results.rows.item(i).latitude;
     locations[i][2] = results.rows.item(i).longitude;
 }
 
     console.log(locations);
 getMapMarkers(locations);
}, null);
});
}


function imePretraga(){
	var naslov =document.getElementById("imePretraga").value;
	document.getElementById("dugmici").innerHTML = ("");
	var locations;
    myDB.transaction(function(transaction) {
transaction.executeSql("SELECT * FROM planine WHERE naziv LIKE  '%"+naslov+"%'", [], function (tx, results) {
	var len = results.rows.length, i;
	  locations = [];
	  for (i = 0; i < len; i++) locations[i]=[];
for (i = 0; i < len; i++){
	document.getElementById("dugmici").innerHTML += ("<button type='button' onclick='bazaPregled()' value="+results.rows.item(i).naziv+">"+results.rows.item(i).naziv+"</button>");
     locations[i][0] = results.rows.item(i).naziv;
     locations[i][1] = results.rows.item(i).latitude;
     locations[i][2] = results.rows.item(i).longitude;
 }
 
 getMapMarkers(locations);
}, null);
});
}

function opisPretraga(){
	var naslov =document.getElementById("opisPretraga").value;
	document.getElementById("dugmici").innerHTML = ("");
	var locations;
    myDB.transaction(function(transaction) {
transaction.executeSql("SELECT * FROM planine WHERE opis LIKE  '%"+naslov+"%'", [], function (tx, results) {
	var len = results.rows.length, i;
	  locations = [];
	  for (i = 0; i < len; i++) locations[i]=[];
for (i = 0; i < len; i++){
	document.getElementById("dugmici").innerHTML += ("<button type='button' onclick='bazaPregled()' value="+results.rows.item(i).naziv+">"+results.rows.item(i).naziv+"</button>");
     locations[i][0] = results.rows.item(i).naziv;
     locations[i][1] = results.rows.item(i).latitude;
     locations[i][2] = results.rows.item(i).longitude;
 }
 
     //console.log("razdaljina je "+google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(locations[1][1], locations[1][2]), new google.maps.LatLng(locations[2][1], locations[2][2])));
 getMapMarkers(locations);
}, null);
});
}


	var rad = function(x) {
  return x * Math.PI / 180;
};

var razdaljina = function(la1,lo1,la2,lo2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(la2 - la1);
  var dLong = rad(lo2 - lo1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(la1)) * Math.cos(rad(la2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function radius(){
	var x =document.getElementById("radius").value;
	document.getElementById("dugmici").innerHTML = ("");
	var locations;
    myDB.transaction(function(transaction) {
transaction.executeSql("SELECT * FROM planine ", [], function (tx, results) {
	var len = results.rows.length, i;
	  locations = [];
	  for (i = 0; i < len; i++) locations[i]=[];
for (i = 0; i < len; i++){
	var d = razdaljina(sessionStorage.getItem('latitude'),sessionStorage.getItem('longitude'),results.rows.item(i).latitude,results.rows.item(i).longitude);
 if(d<=x)
 {
 	document.getElementById("dugmici").innerHTML += ("<button type='button' onclick='bazaPregled()' value="+results.rows.item(i).naziv+">"+results.rows.item(i).naziv+"</button>");
     locations[i][0] = results.rows.item(i).naziv;
     locations[i][1] = results.rows.item(i).latitude;
     locations[i][2] = results.rows.item(i).longitude;
 }
 }
 getMapMarkers(locations);
}, null);
});
}