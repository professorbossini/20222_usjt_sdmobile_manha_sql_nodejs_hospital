require('dotenv').config()
const express = require ('express')
const mysql2 = require('mysql2')
const nodemon = require('nodemon')
const app = express()
app.use(express.json())

// const DB_HOST = process.env.DB_HOST
// const DB_USER = process.env.DB_USER
// const DB_SCHEMA = process.env.DB_SCHEMA
// const DB_PASSWORD = process.env.DB_PASSWORD

const {DB_HOST, DB_USER, DB_SCHEMA, DB_PASSWORD} = process.env

//POST http://localhost:3000/medicos
app.post('/medicos', (req, res) => {
  const connection = mysql2.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_SCHEMA,
    password: DB_PASSWORD
    // {crm: 774477, nome: 'Jaqueline Alves'}
  })
    // const crm = req.body.crm
    // const nome = req.body.nome
    const { crm, nome } = req.body
    
    // sql injection pde acontecer aqui, não faça assim. Ou seja, não concatene."
    const sql = "INSERT INTO tb_medico (crm, nome) VALUES (?, ?)"

    connection.query(sql, [crm, nome], (err, results, fields) => {
      console.log("Erro: ", err)
      console.log("Results: ", results)
      console.log("Fields: ", fields)
      res.send("ok")
    })


})
//GET http://localhost:3000/medicos
app.get('/medicos', (req, res) => {
	//1 abrir uma conexão com o MySQL
	const connection = mysql2.createConnection({
		host: DB_HOST,
		user: DB_USER,
		database: DB_SCHEMA,
		password: DB_PASSWORD
	})
	//2. Executar o comando SQL
	connection.query('SELECT * FROM tb_medico', (err, results, fields) => {
		console.log('err', err)
		console.log('results', results)
		console.log('fields', fields)
		//3. Devolver o resultado utilizando uma função callback
		res.json(results)
	})
})


//GET http://localhost:3000/pacientes
app.get('/pacientes', (req, res) => {
  //estamos abrindo uma conexão com o MySQL...
  const conexao = mysql2.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_SCHEMA,
    password: DB_PASSWORD
  })

  //vamos executar o comando SELECT..
  conexao.query('SELECT * FROM tb_paciente', (err, results, fields) => {
    if (err){
      res.status(500).json({mensagem: "Erro interno"})
    }
    else{
      res.status(200).json(results)    
    }
  })
})

app.get('/consultas', (req, res) => {
  //1. abrir conexão com o MySQL
  const connection = mysql2.createConnection({
    host: DB_HOST,
    user: DB_USER,
    database: DB_SCHEMA,
    password: DB_PASSWORD
  })
  //2. Especificar o comando SQL
  const sql = `
    SELECT m.nome as nome_medico, c.data_hora, p.nome as nome_paciente
      FROM tb_medico m, tb_consulta c, tb_paciente p
      WHERE
      m.crm = c.crm AND c.cpf = p.cpf
  `
  //3. Executar o comando
  connection.query(
    sql,
    (err, results, fields) => {
      //4. Na callback, devolver o resultado para o cliente
      res.json(results)
    }
  )

})

const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))



