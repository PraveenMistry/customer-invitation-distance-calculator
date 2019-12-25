module.exports = {
    degreesToRadians: (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    },
    calculateDistance: (lat1, lat2, lon1, lon2) => { 
        // Haversine formula  
        var dlon = lon2 - lon1;  
        var dlat = lat2 - lat1; 
        var a = Math.pow(Math.sin(dlat / 2), 2) 
                + Math.cos(lat1) * Math.cos(lat2) 
                * Math.pow(Math.sin(dlon / 2),2); 
            
        var c = 2 * Math.asin(Math.sqrt(a)); 

        // Radius of earth in kilometers. Use 3956  
        // for miles 
        var r = 6371; 

        // calculate the result 
        return(c * r); 
    }
     /*
    Formula:
    Distance = 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(long2 – long1)]
    */
}