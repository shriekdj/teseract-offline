const { createWorker } = require('tesseract.js');
const path = require('path');
const { fs } = require('fs');

const worker = createWorker({
  langPath: path.join(__dirname, '..', 'lang-data'), 
  logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(path.join(__dirname, '..', 'images', 'all-certificates-001.jpg'));
  console.log(text);
	fs.writeFile('result.txt', text, err => {
		if (err) {
			console.error(err);
		}
		// file written successfully
	});
  await worker.terminate();
})();

