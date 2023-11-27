require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const { sendMail, sendMailHTML } = require('./libs/mailer')
const app = express()
const port = 3000
const BASE_URL = process.env.BASE_URL

app.use(express.json())

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  // sendMail(email, `Halo ${name}`, 
  //   `Terima kasih sudah mendaftar di aplikasi kami! Silahkan klik
  //    link berikut untuk proses verifikasi email anda`
  // )
  const url = req.protocol+"://"+req.headers.host
  ejs.renderFile(__dirname + "/templates/register.ejs", 
    { 
      name: name, 
      url: 'http://localhost:3000/auth/users/confirmation/ko21u930182302173' 
    }, 
    function (err, data) {
    if (err) {
      console.log(err);
    } else {
      sendMailHTML(email, `Halo ${name}`, data)
    }
  })
  res.status(200).json({
    status: 'ok',
    message: `Berhasil Register! silahkan cek email 
    untuk verifikasi`,
    url: url
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})