/*
  Skrypt Node.js do przetwarzania plików ankiety z folderu SURVEY
  i zapisywania wyników do pliku Excel.
*/

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Ścieżka do folderu z plikami ankiety
const surveyDir = path.join(__dirname, 'SURVEY');

// Nazwa pliku wynikowego
const outputFile = 'wyniki_ankiety.xlsx';

// Tablica do przechowywania wszystkich wyników
let results = [];

// Odczytanie zawartości folderu SURVEY
fs.readdir(surveyDir, (err, files) => {
  if (err) {
    console.error('Błąd odczytu folderu SURVEY:', err);
    return;
  }

  // Wybór tylko plików JSON
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  jsonFiles.forEach(file => {
    const filePath = path.join(surveyDir, file);
    const fileData = fs.readFileSync(filePath, 'utf8');

    try {
      const jsonData = JSON.parse(fileData);
      
      // Sprawdzenie czy plik zawiera tablicę answers
      if (jsonData.answers && Array.isArray(jsonData.answers)) {
        jsonData.answers.forEach(answer => {
          results.push({
            Plik: file,
            Index: answer.index,
            Feedback: answer.feedback,
            FormatA: answer.test.formatA,
            FormatB: answer.test.formatB,
            Quality: answer.test.quality,
            Image: answer.test.image,
            Width: jsonData.width,
            Height: jsonData.height,
            UserAgent: jsonData.userAgent
          });
        });
      }
    } catch (parseErr) {
      console.error(`Błąd parsowania pliku ${file}:`, parseErr);
    }
  });

  // Tworzenie skoroszytu i arkusza Excel
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(results);
  xlsx.utils.book_append_sheet(wb, ws, 'Wyniki ankiety');

  // Zapis do pliku Excel
  xlsx.writeFile(wb, outputFile);
  console.log('Plik Excel zapisany jako:', outputFile);
});
