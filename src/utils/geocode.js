const request = require("request");

const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent( address )+ ".json?access_token=pk.eyJ1IjoicmFnaGF2MDExMCIsImEiOiJjbDNzMXh6OXYxbWtkM2NwZWVubWMxZzliIn0.t-Ynx1fjinTKE7r-FZjmLQ";
    request({url,json:true},(error,{body})=>{

        if(error){
            callback("unable to connect", undefined)
        }else if(body.features.length === 0){
            callback("invalid location", undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude :body.features[1].center[0],
                location: body.features[0]?.place_name
            })
        }
    })

    
}

module.exports = geocode;

