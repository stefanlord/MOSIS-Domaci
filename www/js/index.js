var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function OtvoriKontakte(){
     window.open("Kontakti.html");
}
function senzori(){
     window.open("More.html");
}
function kameraStrana(){
     window.open("Kamera.html");
}
function vibracijaStrana(){
     window.open("Vibracija.html");
}

function Vibrate() {
    return navigator.vibrate([document.getElementById("ritam").value]);
}
function openCamera(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    if (selection == "camera-thmb") {
        options.targetHeight = 100;
        options.targetWidth = 100;
    }

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        
       document.getElementById("slika").setAttribute("src",imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true , //Corrects Android orientation quirks
        saveToPhotoAlbum:true
    }
    return options;
}
function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    }, onErrorResolveUrl);
}
function onSuccessA(acceleration) {
    document.getElementById('LabelaX').innerHTML = 'Acceleration X: ' + acceleration.x;
    document.getElementById('LabelaY').innerHTML = 'Acceleration Y: ' + acceleration.y;
    document.getElementById('LabelaZ').innerHTML = 'Acceleration Z: ' + acceleration.z;
}

function onErrorA() {
    alert('onError!');
}

function akselometar(){
    //navigator.accelerometer.getCurrentAcceleration(onSuccessA, onErrorA);
    navigator.accelerometer.watchAcceleration(onSuccessA, onErrorA,optionsa);

}
var optionsa = { frequency: 1000 };

function aksStrana(){
    window.open("Akselometar.html");
}
function statusBar(){
    StatusBar.backgroundColorByHexString("#0b0");
    if(StatusBar.isVisible)
        StatusBar.hide();
    else
        StatusBar.show();
}
function mapaStrana(){
    window.open("LocateMe.html");
}

var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(10);
    map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}



function baza(){
 window.sqlitePlugin.echoTest(function() {
    alert('ECHO test OK');
    });
}

function bazaStrana(){
    window.open("baza.html");
}
function pretragaStrana(){
    window.open("Pretraga.html");
}
function bazaPregled(id1){
    if(id1==null)
        sessionStorage.setItem('id', window.event.target.value);
    else
        sessionStorage.setItem('id', id1);    
    window.open("bazaPregled.html");
}

function clearTable()
{
    var div = document.getElementById('TableData');
while(div.firstChild){
    div.removeChild(div.firstChild);
}
}
function popuniPlatno(){

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var grd = ctx.createRadialGradient(75,50,5,90,60,100);
grd.addColorStop(0,"yellow");
grd.addColorStop(1,"green");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,200,100);
ctx.font = "30px Arial";
ctx.fillStyle = "black"
ctx.fillText("Interaktivno",10,30);
ctx.fillText("Planinarenje",10,90);
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();
}

function fbShare(){
    slika=sessionStorage.getItem('id');
    red = sessionStorage.getItem('slika');
window.plugins.socialsharing.shareViaFacebook(null,"www/img/"+slika+"/"+red+".jpg", null,
 function()
{console.log('share ok')}, function(errormsg){alert(errormsg)});
}

function instaShare(){
    slika=sessionStorage.getItem('id');
    red = sessionStorage.getItem('slika');
    naziv = sessionStorage.getItem('naziv');
window.plugins.socialsharing.shareViaInstagram(naziv, "www/img/"+slika+"/"+red+".jpg", 
    function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
}

function twitterShare(){
    slika=sessionStorage.getItem('id');
    red = sessionStorage.getItem('slika');
    naziv = sessionStorage.getItem('naziv');
window.plugins.socialsharing.shareViaTwitter(naziv, "www/img/"+slika+"/"+red+".jpg", null);
}

function getMapMarkers(locations) {
    var map;

var ll =sessionStorage.getItem('latitude');
var lr =sessionStorage.getItem('longitude');
    var mapOptions = {
      zoom: 7,
      center: new google.maps.LatLng(ll,lr),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);

    var marker, i;
 marker = new google.maps.Marker({
        position: new google.maps.LatLng(ll, lr),
        map: map
      });
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
       // icon:"img/"+locations[i][0]+"/1.jpg"
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("<button type='button' onclick='bazaPregled()' value="+locations[i][0]+">"+locations[i][0]+"</button>");
          infowindow.open(map, marker);

        }
      })(marker, i));
    }
    
}

function pozicioniranje(){
    navigator.geolocation.getCurrentPosition
    (function(position){
        sessionStorage.setItem('latitude', position.coords.latitude);
        sessionStorage.setItem('longitude',position.coords.longitude);
    }, onMapError, { enableHighAccuracy: true });
}


function notifikacija(id1, txt){
    console.log(sessionStorage.getItem("id"+id1)+" "+id1)
    if(sessionStorage.getItem("id"+id1)==1)
        {
    cordova.plugins.notification.local.schedule({
    id: id1,
    text: "U vašoj blizini se nalazi "+ txt+".",
    data:txt

})
    cordova.plugins.notification.local.on("click", function(notification) {
    console.log("clicked: " + notification.id + notification.data);
     sessionStorage.setItem("id"+notification.id,1);
     bazaPregled(notification.data);
});
    cordova.plugins.notification.local.on("trigger", function(notification) {
     sessionStorage.setItem("id"+notification.id,0);
    console.log("triggered: " + notification.id + notification.data);
});
 cordova.plugins.notification.local.on("cancel", function(notification) {
     sessionStorage.setItem("id"+notification.id,1);
    console.log("canceled: " + notification.id + notification.data);
});
}
}


function pratiKretanje() {

    return navigator.geolocation.watchPosition
    (uspesno, onMapError, { enableHighAccuracy: true });
}

var uspesno = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;
        sessionStorage.setItem('latitude', updatedLatitude);
        sessionStorage.setItem('longitude', updatedLongitude);
        asinhroniRadius();
        getMap(updatedLatitude, updatedLongitude);
    }
}

function asinhroniRadius(){
    var x;
    if(document.getElementById("radiusPosmatranje").value=="")
        x=66666;
    else
     x =document.getElementById("radiusPosmatranje").value;
    myDB.transaction(function(transaction) {
transaction.executeSql("SELECT * FROM planine ", [], function (tx, results) {
    var len = results.rows.length, i;
for (i = 0; i < len; i++){
    var d = razdaljina(sessionStorage.getItem('latitude'),sessionStorage.getItem('longitude'),results.rows.item(i).latitude,results.rows.item(i).longitude);
 if(d<=x)
 {
   notifikacija(results.rows.item(i).id, results.rows.item(i).naziv);
 }
 }
}, null);
});
}

function setTrue(){
    for (i = 0; i < 11; i++){
        sessionStorage.setItem("id"+i,1);
    }
}