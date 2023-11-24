const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
        clientId: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        refreshToken: process.env.G_REFRESH_TOKEN
    }
})

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'amiruddinid@gmail.com',
        to,
        subject,
        text
    } 
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(error)
        }else{
            console.log('Email sent: ' + info.response)
        }
    })
}


module.exports = sendMail;