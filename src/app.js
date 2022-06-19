const path = require("path")


const express = require("express")
const hbs = require("hbs")
const { response } = require("express")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")



const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Raghav'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Raghav'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Raghav'
    })
})


app.get("/weather", (req,res)=>{
    if(!req.query.address){
       return  res.send({
            error: "an adrress must be provides"
        })
    }

    geocode(req.query.address, (err,{longitude,latitude,location} = {})=>{
        //console.log(longitude, latitude);
        if(err){
            return res.send({
                err
            })
        }
        forecast(latitude,longitude, (err,forecasrtData)=>{
            if(err){
                return res.send({
                    err
                })

            }
            res.send({
                forecast : forecasrtData,
                location
            })
        })



    })


    
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }
    

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get("help/*", (req,res)=>{
    res.render("404")
        
    })

app.get("*", (req,res)=>{
res.render("404")
    
})

app.listen(port, () => {
    console.log("server is up on port:" + port)
})