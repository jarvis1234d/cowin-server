
const express = require('express');
//const https = require('https');
const bodyParser = require('body-parser')
const axios = require('axios');
const sha256 = require('js-sha256');
//const ejs = require('ejs');

var txn_Id;
var token;

app = express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
//app.set('view engine', 'ejs');

confirmOTP = {
    method: 'post',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
    data:{
        otp: String,
        txnId: String
    }
}
    
generateOTP = {
    method: 'post',
    url: 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
    data: {
    mobile: "8308873441"
    }
}

// async function getOTP(){

// }

async function getOTP(){
    
    
    await axios(generateOTP)
    .then((res)=>{
        console.log(res.data);
        txn_Id = res.data.txnId;
    })
    .catch((error)=>{
        console.log(error.response.status);
        console.log(error.response.data);
    });
} 

async function sendOTP(){
    
    //confirmOTP.data.otp = sha256(confirmOTP.data.otp);
    console.log("Recieved OTP: "+confirmOTP.data.otp);
    confirmOTP.data.txnId = txn_Id;
    
    await axios(confirmOTP)
    .then((res)=>{
        token = res.data.token
        console.log("TOKEN: "+token);
    })
    .catch((error)=>{
        console.log(error.response.status);
        console.log(error.response.data);
    });
}
getOTP();


app.get('/', (req, res)=>{
    res.sendFile( __dirname + '/views/otp.html');
})

app.post('/otp', urlencodedParser, (req, res)=>{
   confirmOTP.data.otp = sha256(req.body.otp);
   sendOTP();
   res.redirect('/');
})

app.listen(3000, (req, res)=>{
    console.log("server started");
})