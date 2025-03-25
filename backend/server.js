const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'https://smart-cv-iota.vercel.app',
  credentials: true
}));

app.use(bodyParser.json());
const path = require('path');

if (!fs.existsSync('./resumes')) {
  fs.mkdirSync('./resumes'); // ✅ Folder create if not exists
}

app.post('/generate-resume', (req, res) => {
  const data = req.body;
  const doc = new PDFDocument();
  const filename = `SmartCV_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, 'resumes', filename);

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(25).text('SmartCV', { align: 'center' });
  doc.moveDown();

  doc.fontSize(18).text(`Name: ${data.personal.name}`);
  doc.text(`Email: ${data.personal.email}`);
  doc.text(`Phone: ${data.personal.phone}`);
  doc.text(`Address: ${data.personal.address}`);
  doc.moveDown();

  doc.text(`Degree: ${data.qualification.degree}`);
  doc.text(`University: ${data.qualification.university}`);
  doc.text(`Year: ${data.qualification.year}`);
  doc.moveDown();

  doc.text(`Summary: ${data.summary}`);
  doc.moveDown();
  doc.text(`Skills: ${data.skills}`);
  doc.moveDown();

  doc.text(`Job Title: ${data.profession.jobTitle}`);
  doc.text(`Experience: ${data.profession.experience}`);
  doc.text(`Background: ${data.profession.background}`);

  doc.end();

  writeStream.on('finish', () => {
    console.log('PDF Generated:', filename);
    res.json({ downloadLink: `https://smart-cv-s3xx.onrender.com/resumes/${filename}` });

});


  writeStream.on('error', (err) => {
    console.error('PDF generation failed:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  });
});

app.use('/resumes', express.static('resumes'));

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
