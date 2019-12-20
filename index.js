const dotevn  = require('dotenv').config();
const fs = require('fs');
const readline = require('readline');
const filePath = process.env.FILEPATH;
const outputFilePath = process.env.OUTPUTFILEPATH;
const { calculateDistance, degreesToRadians } = require('./distance');

const originLatitude = degreesToRadians(process.env.ORIGINLATITUBE);
const originLongitude = degreesToRadians(process.env.ORIGINLONGITUBE);

if(!filePath || !originLatitude || !originLongitude){
    console.log("READ INSTRUCTION MENTIONED IN README");
    process.exit(1);   
}

let inviteCustomer = [];


const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
});


rl.on('line', (line) => {
    var lineObject = JSON.parse(line);

    // The math module contains a function 
    // named toRadians which converts from 
    // degrees to radians. 
    var latitude  = degreesToRadians(lineObject.latitude);
    var longitude = degreesToRadians(lineObject.longitude);

    var dis = calculateDistance(originLatitude,latitude,originLongitude,longitude);
    
    if(dis<=100){
        var user = {
            'user_id':lineObject.user_id,
            'name':lineObject.name
        }
        inviteCustomer.push(user);
    }
});

function createOutputFile(json){
    json = JSON.stringify(json).replace('[','').replace(']','').split("},").join("}\n");
    fs.writeFile(outputFilePath, json, 'utf8', function(err) {
        if (err) throw err;
            console.log('output', json);
        }
    );
}

rl.on('close', function () {
    createOutputFile(inviteCustomer.sort((a, b) => parseFloat(a.user_id) - parseFloat(b.user_id)))
});

exports.printMsg = function() {
    console.log("This is a message from the distance-calculator package");
}