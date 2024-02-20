import express from 'express'
import conexao from '../infra/conexao.js'

const app = express ()

//Indiciar ao express ler body com Json
app.use(express.json())

function buscarNpcPorId (id) {
  return NPC.filter(NPC => NPC.id == id)
}

function buscarIndexNpc(id) {
  return NPC.findIndex(NPC => NPC.id == id)
}

//Listar os NPC
app.get('/NPC', (req, res) => {
  //res.status(200).send(NPC)

  const sql = "SELECT * FROM ativos_table;"
  conexao.query(sql, (erro, result) => {
    if(erro) {
      console.log(erro)
      res.status(404).json({ 'erro' : erro})
    } else {
      res.status(200).json(result)
    }
  })

})

//Buscar NPC por id
app.get('/NPC/:id', (req, res) => {
  res.json(buscarIndexNpc(req.params.id))
})

//Adicionar algum NPC
app.post('/NPC/:id', (req, res) => {
  NPC.push(req.body)
  let index = buscarIndexNpc(req.params.id);
  
  if (index !== -1) {
    const atributosAtualizados = {};

    for (const atributo in ATRIBUTOS) {
      
        if(req.body.hasOwnProperty(atributo)) {
          atributosAtualizados[atributo] = req.body[atributo];
        }
    }
      Object.assign(NPC[index].Atrbts, atributosAtualizados);
      
      res.json(NPC);
  } else {
    res.status(404).json({error: 'NPC não encontrado'})}
})

//Atualizar dados NPCs
app.put('/NPC/:id', (req, res) => {
  let index = buscarIndexNpc(req.params.id);

  if (index !== -1) {
    NPC[index].Atrbts = req.body.Atrbts;
    res.json(NPC);
  } else {
    res.status(404).json({ error: 'NPC não encontrado' });
  }
});

//Deletar algum NPC
app.delete('/NPC/:id', (req, res) =>{
  let index = buscarIndexNpc(req.params.id)
  NPC.splice(index, 1)
  res.send(`NPC com id ${req.params.id} excluido com sucesso!`)
})

  
export default app