import express from 'express'; // Importa o módulo express
import cors from 'cors'; // Importa o módulo cors
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3002;

const nomeDoBancoDeDados = 'urubuflix';

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    // Verifica se a conexão com o banco de dados foi estabelecida
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});



app.post('/register', async (req, res) => {
  const sentEmail = req.body.Email;
  const sentUserName = req.body.UserName;
  const sentPassword = req.body.Password;
  const sentNickName = req.body.NickName;

  try {
    // Cria o usuário usando o Prisma
    await prisma.users.create({
      data: {
        email: sentEmail,
        username: sentUserName,
        password: sentPassword,
        nickname: sentNickName
      }
    });
    console.log('User created successfully');

    // Envia uma resposta de sucesso
    res.send({ message: 'User created successfully' });
  } catch (error) {
    // Envia uma resposta de erro
    console.error('Error creating user:', error);
    res.send({ error: 'Internal server error' });
  }
});


//credentials
app.post('/login', async (req, res) => {
 
  const sentUserName = req.body.LoginUserName
  const sentPassword = req.body.LoginPassword
  //console.log(req.body)
  
  try {
    // Busca o usuário no banco de dados
    const user = await prisma.users.findFirst({
      where: {
        username: sentUserName,
        password: sentPassword
      }
    });

    // Verifica se o usuário foi encontrado
    if (user) {
      console.log('User found:', user.username);
      res.send(user);
    } else {
      console.log('User not found');
      res.send(1);
    }
  }
  catch (err) {
    console.error('Error finding user:', err);
    res.send({ error: err });
  }


})

app.post("/forgotPassword", async (req, res) => {
  const sentEmail = req.body.checkEmail
  const sentNickName = req.body.checkNickname

  try{
    const user = await prisma.users.findFirst({
      where: {
        email: sentEmail,
      }
    })

    //console.log(user.email);
    res.send(user)
    
  }
  catch(err){
    res.send({error: err})
  }
})

app.put("/updatePassword", async (req, res) => {
  const sentEmail = req.body.Email
  const sentPassword = req.body.Password

  try{
    const user = await prisma.users.findFirst({
      where: {
        email: sentEmail,
      }
    })

    const x = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: sentPassword
      }
    })


    res.send(x)

  }
  catch(err){
    console.log("Error update user: ", err);
  }
})