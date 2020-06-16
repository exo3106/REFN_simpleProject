const expressApp = require('express')
const axios = require('axios')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

//Router fot the app

//Initiate the express application
const app = expressApp()
//Use cors to allow external urls to send data from the client
app.use(cors())
//Running port on the server
const PORT  = process.env.PORT || 8080
app.use(expressApp.json())
app.use(expressApp.urlencoded({extended:true}))

app.use(morgan('tiny'))

//Starting your firebase store configuration
const fireadmin = require('firebase-admin');  
var serviceAccount = require('../server/my-project-1543686053761-firebase-adminsdk-2yqt8-be05a5b445.json');
fireadmin.initializeApp({
    credential: fireadmin.credential.cert(serviceAccount),
    databaseURL: 'https://my-project-1543686053761.firebaseio.com/'
  });

let db = fireadmin.firestore();

//Creating simple routes for the app
app.post('/addUser', async(req,res,next)=>{

    try {
        let rawdata = req.body
        console.log("Body:", rawdata )
        const data = { info:rawdata }
        const dataRef = db.collection('UserInfo').doc('dKkdEbPJ8wgXiNovSOWM').update(data)
        
        res.json({
            id: dataRef.id,
            data
        })
    } catch (error) {
        next(error)
    }
})

//Listening Port
app.listen(PORT, console.log(`Server started: ${PORT}`))