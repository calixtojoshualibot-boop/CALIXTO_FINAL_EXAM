const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Log what files are actually there to the Render logs
const files = fs.readdirSync(__dirname);
console.log("Files found in root:", files);

app.use(express.static(__dirname));

app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // This will print the actual files to your browser screen so we can see the mistake
        res.status(404).send(`
            <h1>File Not Found</h1>
            <p>The server is looking for <b>index.html</b> but it's not here.</p>
            <p><b>Files actually present:</b> ${files.join(', ')}</p>
            <p><i>Hint: Check if your file is named "Index.html" with a capital I.</i></p>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
