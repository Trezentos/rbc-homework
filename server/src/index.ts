import express from 'express';
import procurarViaRBC from './services/procurarViaRbc';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());


app.post('/', (req, res) => {

    const { processador, placaDeVideo, disco, memoriaRam } = req.body;

    const computadores = procurarViaRBC({ processador, placaDeVideo, memoriaRam, disco });

    console.log(computadores);

    return res.json(computadores);
})

app.listen(3000, () => {
    console.log('Servidor levantado na porta 3000');
})