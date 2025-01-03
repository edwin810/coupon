const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'raffle_entries.txt');

// Middleware for parsing JSON
app.use(express.json());

// API to append entry to the file
app.post('/add-entry', (req, res) => {
    const { entry } = req.body;
    if (!entry) {
        return res.status(400).send({ message: 'Entry is required.' });
    }

    // Append entry to the file
    fs.appendFile(DATA_FILE, `${entry}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send({ message: 'Failed to add entry.' });
        }
        res.send({ message: 'Entry added successfully.' });
    });
});

// Serve the front-end
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
