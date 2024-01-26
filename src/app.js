/*const express = require('express')
const app = express()
const port = 3000

app.get('/somatorio/:num1/:num2', (req, res) => {
    try {
        //Obtenção de parâmetros da URL:
        const num1 = parseFloat(req.params.num1);
        const num2 = parseFloat(req.params.num2);

        //calculo:
        const resultado = num1 + num2;

        //retorno do resultado em formato JSON
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor ativo disponível no endereço http://localhost:${port}`)
})
*/

/*
const express = require('express');
const app = express();
const port = 3000;

app.get('/somatorio/:nums', (req, res) => {
    try {
        //Obtenção de parâmetros da URL:
        const nums = req.params.nums.split('+').map(Number);

        if(nums.some(isNaN)) {
            throw new Error('Os valores devem ser números válidos.');
        }

        //calculo:
        const resultado = nums.reduce((acc,num) => acc + num, 0);

        //retorno do resultado em formato JSON
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor ativo disponível no endereço http://localhost:${port}`);
})
*/


import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()
//indicar para o express ler body com Json
app.use(express.json())


function buscarSelecaoPorId(id) {
    return selecoes.filter (selecao => selecao.id == id)
}

function buscaIndexSelecao(id) {
    return selecoes.findIndex(selecao => selecao.id == id)
}


app.get('/selecoes', (req, res) => {
    // res.status(200).send(selecoes)
    const sql = "SELECT * FROM selecoes;"
    conexao.query(sql, (error, resultado) => {
        if (error){
            res.status(404).json({'erro': error })
        } else {
            res.status(200).json(resultado)
        }
    })
})

app.get('/selecoes/:id', (req, res) => {
    res.json(buscarSelecaoPorId(req.params.id))
})

app.post('/selecoes/cadastro', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')

})

app.delete('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
})


app.put('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo = req.body.grupo
    res.json(selecoes)
})

app.get('/usuarios', (req, res) => {
    // Realize uma consulta SELECT no banco de dados para obter os usuários
    conexao.query('SELECT * FROM usuarios', (erro, resultados) => {
        if (erro) {
            console.error(erro);
            res.status(500).send('Erro ao recuperar usuários do banco de dados');
        } else {
            res.status(200).json(resultados);
        }
    });
});

export default app 



