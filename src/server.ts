import express from 'express';

const server = express();

server.get('/', (req, res) => {
    res.send('oiii');
})

server.listen(4000, () => {
    console.log("servidor rodando!")
})