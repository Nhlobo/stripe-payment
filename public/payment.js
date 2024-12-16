// public/payment.js
// Set your test publishable key
const stripe = Stripe('your-publishable-key'); // Replace with your Stripe test key
const elements = stripe.elements();

// Create an instance of the card Element
const card = elements.create('card');

// Add the card Element to the page
card.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Create a payment method using the card details
    const {token, error} = await stripe.createToken(card);

    if (error) {
        // If there is an error, show it to the user
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // If the token was created, submit it to your backend for processing
        stripeTokenHandler(token);
    }
});

// Submit the token to your backend
function stripeTokenHandler(token) {
    // Create a form to send the token to the backend
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/charge'); // Set to your backend URL for handling payments

    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);

    form.appendChild(hiddenInput);
    document.body.appendChild(form);
    form.submit();
}
