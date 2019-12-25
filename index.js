const fs = require('fs');
const readline = require('readline');
const { degreesToRadians, calculateDistance } = require('./distance');

module.exports = {
    doInvite: function(inputFilePath, outputFilePath, originLatitude, originLongitude){

        if(!inputFilePath || !originLatitude || !originLongitude){
            console.log("READ INSTRUCTION MENTIONED IN README");
            process.exit(1);   
        }
    
        originLatitude  = degreesToRadians(originLatitude);
        originLongitude = degreesToRadians(originLongitude);

        let inviteCustomer = [];
    
        const rl = readline.createInterface({
            input: fs.createReadStream(inputFilePath),
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
                console.log("dis",dis);
                inviteCustomer.push(user);
            }
        });
        

        function createOutputFile(json){
            console.log(json);
            json = JSON.stringify(json).replace('[','').replace(']','').split("},").join("}\n");
            fs.writeFile(outputFilePath, json, 'utf8', function(err) {
                if (err) throw err;
                    console.log('output', json);
                }
            );
        }
    
        rl.on('close', function () {
            console.log("inviteCustomer",inviteCustomer);
            createOutputFile(inviteCustomer.sort((a, b) => parseFloat(a.user_id) - parseFloat(b.user_id)))
        });     
    }                      
}