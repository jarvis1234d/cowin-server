
const express = require('express');
//const https = require('https');
const bodyParser = require('body-parser')
const axios = require('axios');
const sha256 = require('js-sha256');
//const prompt = require('prompt-sync');

var txn_Id;

app = express();
app.use(bodyParser.json());

async function app(){
    confirmOTP = {
        method: 'post',
        url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
        
    }
    
    generateOTP = {
        method: 'post',
        url: 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',
        data: {
            mobile: "8308873441"
        }
    }
    
    const response = await axios(generateOTP);
    console.log(response);
    confirmOTP.data.otp = sha256("112254");
    confirmOTP.data.txnId = txn_Id;
    
    // await axios(confirmOTP)
    // .catch((error=>{
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    
    // }))
    // .then((res)=>{
    //     console.log(res.data);
    // })
}
app();

app.listen(3000, (req, res)=>{
    console.log("server started");
})