const express = require('express');
const app = express();
const port = 3000;

app.locals.color_sequence = []

//generates a random number between 1 and 4 that represents the colors r,o,g,b
function randomcolor() {
    let c = Math.floor((Math.random() * 4) + 1);   
    return c;
}

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});

// sends the sequnce of colors and adds one each time the request is made
app.get('/color_sequence', (req, res) => {
    color_sequence.push(randomcolor());
    res.send(color_sequence);
});

// clears the color_sequencew array and 
app.get('/failed', (req, res) => {
    color_sequence = []
    color_sequence.push(randomcolor());
    res.send(color_sequence);
});

//when the game is over
app.get('/quit', (req, res) => {
    color_sequence = []
});

console.log("i am not broken")
console.log(randomcolor())
console.log(randomcolor())
console.log(randomcolor())
console.log(randomcolor())
console.log(randomcolor())

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
