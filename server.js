import app from './src/app.js'
const PORT = 3000;

import conexao from './infra/conexao.js'

conexao.connect((erro) => {
  if (erro) {
    console.log(erro)
  } else {
    console.log("Conexão realizada com sucesso!")
  }
})

app.listen(PORT, () => {
    console.log(`Servidor ativo disponível no endereço http://localhost:${PORT}`);
  })