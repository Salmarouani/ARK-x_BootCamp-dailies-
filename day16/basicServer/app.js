import express from 'express';

const app = express();
const PORT = 3000;

app.get('/',(req, res, next)=>{
    res.send("Welcome to my Express.js server");
})

app.listen(PORT,()=>{
    console.log(`The server is listening on port ${PORT}`);
    console.log(`http://localhost:3000`);
})