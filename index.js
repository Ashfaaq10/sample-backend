const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Configure multer storage to retain original filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Handle file uploads
app.post('/api/upload', upload.single('photo'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }
    res.send({ message: 'File uploaded successfully.', file });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
