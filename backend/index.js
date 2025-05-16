import express from 'express';
import registros from './routers/registros.routes.js';
import cors from 'cors';


const app = express()
const PORT = 3000;

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en  http://localhost:${PORT}`)
})

app.use(express.json());

app.use('/book-reviews', registros);