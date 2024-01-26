//Aqui vamos ativar o dotenv para ele ler os arquivos
require('dotenv').config();

const axios = require('axios');

//Url para pesquisar no Elasticsearch
const ElasticsearchUrl = `http://${process.env.HOST_CLI}:9200/_search/`



//Configurações de pesquisa - Query Params
const ElasticConfig = {
    filter_path: 'hits.hits._source.destination.port,hits.hits._source.destination.ip,hits.hits._source.source.port,hits.hits._source.source.ip,hits.hits._source.network.bytes,hits.hits._source.network.transport,hits.hits._source.@timestamp'
};

//Dados da pesquisa  - Body Raw
const searchData = {
  "_source": ["source.ip", "source.port", "destination.ip", "destination.port", "network.transport", "network.bytes","@timestamp"],
  "query": {
    "bool": {
      "must": [
        { "range": { "source.bytes": { "gt": 100 }}},
        { "range": { "@timestamp": { "gte": "now-10m/m", "lt": "now/m" }}}
      ]
    }
  }
};  

//Função para fazer a solicitação HTTP usando Axios

async function makeRequest() {
    try {
        // Realiza a solicitação http
        const response = await axios.post(ElasticsearchUrl, searchData, {params: ElasticConfig});

        //Imprime os dados da resposta no terminal
        response.data.hits.hits.forEach(hit => { 
            console.log('Dados da resposta da solicitação:');
            console.log(hit._source);
        });
    } catch (error) {
        //Lida com erros, se houver
        console.error('Erro na solicitação:', error.message);
    }

}
makeRequest()