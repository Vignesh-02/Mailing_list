require('dotenv').config()
const SibApiV3Sdk = require('sib-api-v3-sdk');
const express = require('express')
const app = express()

app.use(express.json())




app.post('/sendEmail',(req,res) => {
    const {email} = req.body
    console.log(email)
    // res.json({ message: 'Email received', email: email });

    // create contact
        let defaultClient = SibApiV3Sdk.ApiClient.instance;

        let apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;

        let apiInstance = new SibApiV3Sdk.ContactsApi();

        let createContact = new SibApiV3Sdk.CreateContact();

        createContact.email = email;
        createContact.listIds = [2]

        apiInstance.createContact(createContact).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.status(201).json({ success: "Your contact was added successfully", data })
        }, function(error) {
        console.error(error);
        res.status(400).json({ error })
        });


})





// apiInstance.createEmailCampaign(createContact).then(function(data) {
//     console.log('API called successfully. Returned data: ' + data);
//     res.status(200).json({ success: data })
// }, function(error) {
//     console.error(error);
//     res.status(400).json({ error })
// });


const port = process.env.PORT || 5001



app.use((req,res,next)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})