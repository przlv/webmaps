const fs = require('fs');
const path = require('path');

const directoryPath = 'src/data/dataRegions';
const typePoints = [];

const checkPoint = (point) => {
    if (!typePoints.includes(point.properties.typeObject)) {
        typePoints.push(point.properties.typeObject)
    }
} 

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }

  let filesProcessed = 0;
  const totalFiles = files.length;

  files.forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
          console.error(`Ошибка чтения файла ${file}:`, readErr);
        } else {
          try {
            const jsonData = JSON.parse(data);
            for (let obj of jsonData.features) {
                checkPoint(obj);
            }
          } catch (jsonErr) {
            console.error(`Ошибка разбора JSON файла ${file}:`, jsonErr);
          }
        }
        filesProcessed++;
        if (filesProcessed === totalFiles) {

          const infofilePath = 'src/data/infoData.json';
          let infofileData = { typePoints: [] };
          try {
            const existingData = fs.readFileSync(infofilePath, 'utf8');
            infofileData = JSON.parse(existingData);
          } catch (readInfofileErr) {
            if (readInfofileErr && readInfofileErr.code !== 'ENOENT') {
              console.error('Ошибка чтения infoData.json:', readInfofileErr);
            }
          }

          infofileData.typePoints = typePoints;
          fs.writeFile(infofilePath, JSON.stringify(infofileData), 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Ошибка записи в файл infoData.json:', writeErr);
            } else {
              console.log('typePoints успешно обновлены в infoData.json');
            }
          });
        }
      });
    }
  });
});
