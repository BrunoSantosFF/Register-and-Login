const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())


app.listen(3002, () => {
  console.log("Entrou no server");
})

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
  database:'urubuflix',
})


app.post('/register', (req,res)=>{
  const sentEmail = req.body.Email
  const sentUserName = req.body.UserName
  const sentPassword = req.body.Password
  const sentNickName = req.body.NickName


  const sql = 'INSERT INTO users (email, username, password,nickname) VALUES (?,?,?,?)'
  const values = [sentEmail,sentUserName,sentPassword,sentNickName]

  db.query(sql, values, (err, results) => {
    if (err){
      res.send(err)
    }
    else {
      console.log('User inserted secccessfully!!')
      res.send({message: 'User added!'})
    }
  })


})

//credentials
app.post('/login', (req, res) => {
 
  const sentUserName = req.body.LoginUserName
  const sentPassword = req.body.LoginPassword


  const sql = 'SELECT * FROM users WHERE username = ? && password = ?'
  const values = [sentUserName,sentPassword]

  db.query(sql, values,(err, results) => {
    if (err){
      res.send({error: err})
    }
    if (results.length > 0){
      res.send(results)
    }
    else {
      res.send({message: `Credenditals Don't match`})
    }
  })

})