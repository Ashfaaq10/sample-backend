const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({ storage: storage });

// Route to handle file uploads and calculations
app.post('/api/upload', upload.single('photo'), (req, res) => {
    try {
        // Check if file was uploaded successfully
        if (!req.file) {
            return res.status(400).send({ message: 'Please upload a file.' });
        }

        // Perform calculations or processing here
        // Example: Calculate image dimensions
        const dimensions = {
            width: 100, // Replace with actual calculations
            height: 200 // Replace with actual calculations
        };

        // Example response with calculated dimensions
        res.status(200).send({
            message: 'File uploaded and processed successfully.',
            dimensions: dimensions
        });
    } catch (err) {
        console.error('Error uploading or processing file:', err);
        res.status(500).send({ message: 'Internal server error.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
