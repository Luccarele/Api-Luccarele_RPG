import app from './src/app.js'

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ativo disponível no endereço http://localhost:${PORT}`);
})
