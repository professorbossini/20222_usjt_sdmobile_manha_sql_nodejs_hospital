# Como configurar o dotenv

(OK) 1. Criar um arquivo oculto (.env) que armazenará dados como usuário, senha etc

(OK)2. Adicionar no arquivo .env todos os valores de interesse no formato chave=valor

(OK) 3. Fazer o download do pacote dotenv

(OK) 4. Instruir o dotenv a fazer o processamento do arquivo .env de modo que as variáveis nele definidas fiquem disponíveis como variáveis de ambiente, acessíveis por meio do objeto process.env

(OK)5. No código .js, deixar de usar os valores fixos e usar os valores obtidos por meio do objeto process.env

(OK) 6. Adicionar o .env ao arquivo .gitignore de modo que esses valores não mais façam parte do controle de versão