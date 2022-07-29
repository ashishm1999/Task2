const express = require("express")
const bodyParser = require("body-parser")
// const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

require("dotenv").config()
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    console.log(firstname, lastname, email)
    const sendMail = async (msg) => {
        try {
            await sgMail.send(msg)
            console.log("Message Sent Successfully!")
        } catch (error) {
            console.error(error)

            if (error.response) {
                console.error(error.response.body);
            }
        }
    }
    sendMail({
        to: email,
        from: "manchandaa45@gmail.com",
        Subject: "NodeJs says hello",
        Text: ("Welcome!! " + firstname + lastname + "to Dev@Deakin"),
    })
    console.log("Done")
    res.send("Email Sent !!")
})


app.listen(8080, function (request, response) {
    console.log("Server is running on port 8080")
})

