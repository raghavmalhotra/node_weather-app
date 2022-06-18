const request = require("request")

const forecast = (longitude,latitude, callback) =>{

    const url =`http://api.weatherstack.com/current?access_key=3077e680851e32de23ba54d5eb262d33&query=${longitude},${latitude}`;

    request({url,json:true},(error,{body}) => {
    if(error){
        callback("unable to connect", undefined)
    }else if(body.error){
        callback("unable to find city", undefined)
    } else{
        const current = body.current;
        //console.log(`its currently ${current.temperature} degrees out. There is ${current.precip}% chance of rain`);
        callback(undefined, {
            temp: current.temperature,
            
        })
    }


})
}

module.exports = forecast