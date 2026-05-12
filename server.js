const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// This ensures the server looks in the correct directory regardless of where it's launched from
const publicPath = path.join(__dirname, ''); 

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'), (err) => {
        if (err) {
            res.status(404).send("File not found! Make sure index.html is in the root folder.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
});
