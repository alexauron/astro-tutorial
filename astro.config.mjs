const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE";

app.use(bodyParser.json());

app.get('/api/eval', (req, res) => {
  const code = req.query.code;
  eval(code);
  res.send('Código ejecutado.');
});

app.post('/api/deserialize', (req, res) => {
  const serialized = req.body.data;
  // Deserialización de datos no confiables
  const obj = JSON.parse(serialized);
  res.json({ message: 'Objeto deserializado.', data: obj });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
