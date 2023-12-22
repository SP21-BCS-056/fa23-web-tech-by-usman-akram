const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static files (HTML, CSS, JS, etc.)
app.use(express.static('public'));

// Handle form submission at the /calculate endpoint
app.post('/calculate', (req, res) => {
    // Server-side calculation logic
    const operand1 = parseFloat(req.body.operand1);
    const operand2 = parseFloat(req.body.operand2);
    const operation = req.body.operation;

    let result;
    switch (operation) {
        case 'add':
            result = operand1 + operand2;
            break;
        case 'subtract':
            result = operand1 - operand2;
            break;
        case 'multiply':
            result = operand1 * operand2;
            break;
        case 'divide':
            result = operand1 / operand2;
            break;
        default:
            res.status(400).json({ error: 'Invalid operation' });
            return;
    }

    // Respond with the result
    res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
