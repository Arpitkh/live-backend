import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health',(req, res) => {
    res.json({status: 'OK'});
});

const PORT = process.env.PORT || 8000;

async function startServer()
{
    const server = await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}

startServer();

