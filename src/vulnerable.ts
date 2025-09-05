import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = "super_secret_key_12345";

app.post('/api/exec', (req: Request, res: Response) => {
  const user = req.body.user;
  const command = `echo 'Usuario: ' ${user}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send('Error al ejecutar el comando');
    }
    res.send(stdout);
  });
});

app.post('/api/deserialization', (req: Request, res: Response) => {
  const serializedData = req.body.data;
  const obj = JSON.parse(serializedData);
  res.json(obj);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
