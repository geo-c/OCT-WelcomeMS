# WelcomeMS
Mobile navigation and orientation web app for refugees.

## Technologies
Apache Cordova: https://cordova.apache.org/ 
AngularJS: https://angularjs.org/ 
Google Maps: https://developers.google.com/maps/

## Installation
1.) Install Apache Cordova (https://cordova.apache.org/#getstarted)

2.) Create a project following Apache Cordova guide

3.) Download www folder from this repository

4.) Grap a google maps api 

5.) Search for API-KEY in the main index.html and replace it with the key

6.) run it in a browser or on a mobile device

## Bugs
It seems that the map in the map section and the map below the photo don't get well together. Panning the main map somehow destroys the map below the photo. A dirty work-around in app.js reacts to it but doesn't solve the issue.

## To-do
"Listen" to the checkbox: If I choose a refugee camp and with off one of the checkboxes and then switch to another refugee camp, the icons of the corresponding deactivated category is still visible. 
