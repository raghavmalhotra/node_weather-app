const weatherForm = document.querySelector('form')

const search = document.querySelector(`input`)
const output = document.getElementById("output")


weatherForm.addEventListener("submit", e =>{
    e.preventDefault();
    const location = search.value;

    if(location !== ""){
        fetch(`http://localhost:3000/weather?address=${location}`)
            .then(res =>{
                res.json()
                    .then((data) =>{ 
                        console.log(data);
                        if(data.err){
                            output.textContent = data.err;
                        }else{
                            output.textContent = data.forecast.temp + " " + " " + data.location;

                            console.log(data.forecast);

                        }
                    })
            })
    }else{
        output.textContent = "location cannot be empty my friend!"
    }

})














//fetch('https://puzzle.mead.io/puzzle').then(res =>{
//     res.json().then(data=>{
//         console.log(data);
//     })
// })


