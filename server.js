const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const infoData = require('./src/data/infoData.json');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/getRegion/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(__dirname, `src/data/dataRegions/full_${fileId}.json`);

  res.sendFile(filePath);
});


app.get('/api/getDistricts', (req, res) => {
  const dataFolderPath = path.join(__dirname, 'src/data/dataRegions');

  fs.readdir(dataFolderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not read data folder' });
      return;
    }

    const districtData = {};

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(dataFolderPath, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const fileId = file.split('_')[1].replace('.json', '');
        let region = 'Empty Region';
        for (let [key, item] of Object.entries(infoData.regions)) {
          if (fileId === item) {
            region = key;
            break;
          }
        }
        let regular_districts = [];
        let district = 'empty district';
        for (let point of fileData.features) {
          try {
            let numDistrict = 1;
            district = point.properties.balloonContentFooter.split(',').map((element) => element.trim().toLowerCase())
            if (district[numDistrict] === region.trim().toLowerCase() || district[numDistrict] === 'Россия'.trim().toLowerCase()) { numDistrict = 2}
            district = district[numDistrict].trim().toLowerCase();
          }
          catch {
            continue;
          }
        
          if (!(regular_districts.includes(district))) {
            regular_districts.push(district);
          }
        }
        districtData[region] = regular_districts;
      }
    });
    
    res.json(districtData);
  });
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
