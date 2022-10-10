const express = require ('express')
const mysql2 = require('mysql2')
const nodemon = require('nodemon')
const app = express()
app.use(express.json())

//GET http://localhost:3000/medicos
/* 
	[
		{
			crm: 12345,
			nome: "José"
		},
		{
			crm: 787878,
			nome: "Maria"
		}
	]
*/

//POST http://localhost:3000/medicos
app.post('/medicos', (req, res) => {
  const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hospital',
    password: 'Ae@125445364'
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
		host: 'localhost',
		user: 'root',
		database: '20222_usjt_sdmobile_manha_hospital',
		password: '12345678'
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
    host: 'localhost',
    user: 'root',
    database: '20222_usjt_sdmobile_manha_hospital',
    password: '12345678'
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

const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))



