import express from 'express'

const app = express ()

//Indiciar ao express ler body com Json
app.use(express.json())

const ATRIBUTOS_COMUNS = {
  Força: 4,
  Destreza: 3,
  Constituição: 4,
  Inteligência: 5,
  Carisma: 3,
  Precisão: 1,
  Habilidade_de_Combate: 1,
  Percepção: 2
};

const ATRIBUTOS_GUARDAS = {
  Força: 5,
  Destreza: 4,
  Constituição: 5,
  Inteligência: 4,
  Carisma: 2,
  Precisão: 2,
  Habilidade_de_Combate: 3,
  Percepção: 3
};

/* 
const ATRIBUTOS_FRANK = {
  Força: 5,
  Destreza: 5,
  Constituição: 3,
  Inteligência: 2,
  Carisma: 1,
  Precisão: 4,
  Habilidade_de_Combate: 1,
  Percepção: 2
};


*/

const NPC = [
    {id: 1, Nome: 'Richard Warden', Cargo: 'Diretor de Alcatraz', Atrbts: ATRIBUTOS_COMUNS},
    {id: 2, Nome: 'Detetive Michael Stone', Cargo: 'Policial', Atrbts: ATRIBUTOS_COMUNS},
    {id: 3, Nome: 'Randall Thompson', Cargo: 'Autoridade Judicial', Atrbts: ATRIBUTOS_COMUNS},
    {id: 4, Nome: '"Fada Madrinha" Florence', Cargo: 'Advogada', Atrbts: ATRIBUTOS_COMUNS},
   // {id: 5, Nome: 'Frank Michell', Cargo: 'Líder dos Carcereiros', Atrbts: },
   // {id: 6, Nome: 'Aguni', Cargo: 'Líder da Gang dos Corvos', Atrbts: },
   // {id: 7, Nome: 'Bones', Cargo: 'O Rei das Cartas', Atrbts: },
]

function buscarNpcPorId (id) {
  return NPC.filter(NPC => NPC.id == id)
}

function buscarIndexNpc(id) {
  return NPC.findIndex()
}

//Listar os NPC
app.get('/NPC', (req, res) => {
  res.status(200).send(NPC)
})

//Buscar NPC por id
app.get('/NPC/:id', (req, res) => {
  res.json(buscarIndexNpc(req.params.id))
})

//Adicionar algum NPC
app.post('/NPC/add', (req, res) => {
  NPC.push(req.body)
  res.status(201).send('NPC Cadastrado com Sucesso')
})

//Deletar algum NPC
app.delete('/NPC/:id', (req, res) =>{
  let index = buscarIndexNpc(req.params.id)
  NPC.splice(index, 1)
  res.send(`NPC com id ${req.params.id} excluido com sucesso!`)
})
  
 export default app