// server.js
const express = require('express');
const stripe = require('stripe')('your-secret-key'); // Replace with your Stripe secret key
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files (like index.html)

app.post('/charge', async (req, res) => {
    const { stripeToken } = req.body;

    try {
        // Create a charge
        const charge = await stripe.charges.create({
            amount: 5000,  // Example amount in cents ($50)
            currency: 'usd',
            description: 'Restaurant Order',
            source: stripeToken,
        });

        // Payment successful, send a response to the frontend
        res.send('Payment Successful! Your order is confirmed.');
    } catch (error) {
        // Handle errors
        res.status(500).send('Payment Failed. Please try again.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
