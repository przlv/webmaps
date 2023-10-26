const express = require('express');
const app = express();
const path = require('path');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Разрешить запросы с этого домена
  res.header('Access-Control-Allow-Methods', 'GET'); // Разрешенные методы
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Разрешенные заголовки
  next();
});

app.get('/api/getRegion/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(__dirname, `src/data/dataRegions/full_${fileId}.json`);

  res.sendFile(filePath);
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
