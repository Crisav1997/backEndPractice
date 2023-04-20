const http= require('http')
const moment = require('moment')

let currentDate= moment()
let validCurrentDate= currentDate.isValid()
currentDate = currentDate//.format("MMM Do YY")
console.log(validCurrentDate)

let bornDate = moment('19971028')
let validBornDate=bornDate.isValid()
console.log(validBornDate)
bornDate=bornDate//.format("MMM Do YY")


let days=currentDate.diff(bornDate,'days')
console.log(days)



const server= http.createServer(
   (req,res)=>res.end(`hoy tenes ${days} de edad`)
)

const PORT= 8080
const callback=()=>console.log('server esta ready on port 8080')

server.listen(
    PORT,
    callback
)