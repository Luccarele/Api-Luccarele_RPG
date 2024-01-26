import mysql from 'mysql2'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Luccarele',
    password: 'lucca123',
    database: 'db_copa'
});

conexao.connect()

export default conexao;

