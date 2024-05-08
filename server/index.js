const express =  require('express')
const mysql =  require('mysql')
const cors =  require('cors')

const app =  express()

//check runing
app.listen( 3000, () => {
  console.log("Runing port 3000");
})

//db (mysql)
const db = mysql.createConnection(
  {
    user: 'root',
    host: 'localhost',
    password:'',
    database:'register_login_db',
  }
)

app.post('/register', (request,response) => {

  const sentEmail =  request.body.Email
  const sentUserName =  request.body.UserName
  const sentPassword =  request.body.PassWord

  const SQL = '' //1:10

})
