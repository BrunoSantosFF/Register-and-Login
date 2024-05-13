const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root', //mudar para a senha do root do seu banco de dados
})

const nomeDoBancoDeDados = 'urubuflix';

app.listen(3002, () => {
  db.connect((err) =>{
    if (err){
      console.log('Error, could not connect to the database: ',err)

      process.exit(1)//fecha a aplicação em caso de erro
    }
    else {
      console.log('Connected to the database')
    }
  
     // Verificar se o banco de dados já existe
     db.query(`CREATE DATABASE IF NOT EXISTS ${nomeDoBancoDeDados}`, (err, result) => {
      if (err) {
          console.error('Erro ao criar o banco de dados:', err);
          process.exit(1);//fecha a aplicação em caso de erro
      }
      if (result.warningCount === 0) {
          console.log(`Banco de dados '${nomeDoBancoDeDados}' criado com sucesso!`);


          db.query(`USE ${nomeDoBancoDeDados}`, (err, result) => {
            if (err) {
                console.error('Erro ao acessar banco: ', err);
                return;
            }
            else{
              console.log('Banco acessado com sucesso!')
              db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, nickname VARCHAR(255) NOT NULL)`, (err, result) => {
              
                if (err) {
                    console.error('Erro ao criar a tabela: ', err);
                    return;
                }
                else {console.log('Tabela criada com sucesso!')}
              })
            }
          })

      } else {
          console.log(`Banco de dados '${nomeDoBancoDeDados}' já existe, criando conexão...`);
          db.query(`USE ${nomeDoBancoDeDados}`, (err, result) => {
            if (err) {
                console.error('Erro ao acessar banco: ', err);
                return;
            }
            else{
              console.log('Banco acessado com sucesso!')
            }
          })
      }

    })
  })
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

app.post("/forgotPassword", (req, res) => {
  const sentEmail = req.body.checkEmail
  const sentNickName = req.body.checkNickname

  const sql = 'SELECT * FROM users WHERE email = ? && nickname = ?'
  const values = [sentEmail,sentNickName]

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