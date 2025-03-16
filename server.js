const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.locals.color_sequence = [];

app.locals.user = 0;

app.use(express.json()); // Middleware to parse JSON

const dbFile = 'dove-server/database.json';

// Function to ensure database file exists
function ensureDatabaseExists() {
    if (!fs.existsSync(dbFile)) {
        fs.writeFileSync(dbFile, JSON.stringify({
            "users": [
              { "id": 1, "name": "Alice" },
              { "id": 2, "name": "Bob" }
            ],
            "scores":[
                {"id":2,"score":3},
                {"id":2,"score":7},
                {"id":1,"score":2}
            ]
          }, null, 2), 'utf8');
    }
}

// Helper function to read database
function readDatabase() {
    const data = fs.readFileSync(dbFile, 'utf8');
    return JSON.parse(data);
}

// Helper function to write to database
function writeDatabase(data) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

//generates a random number between 1 and 4 that represents the colors r,o,g,b
function randomcolor() {
    let c = Math.floor((Math.random() * 4) + 1);   
    return c;
}

//............................................/

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
app.post('/failed', (req, res) => {
    if (user>0){
        const db = readDatabase();
        const { s } = req.body;
        const newScore = { id: user, score:s };
        db.scores.push(newScore);
        writeDatabase(db);
        // res.status(201).json(newScore);
    }

    color_sequence = []
    color_sequence.push(randomcolor());
    res.send(color_sequence);
});

//when the game is over
app.get('/quit', (req, res) => {
    color_sequence = [];
});

app.get('/logout', (req, res) => {
    user=0;
});

//adds the new users information to the database
app.post('/newUser', (req, res) => {
    const db = readDatabase();
    const {n}=req.body;

    let New = true;
    for (i in db.users){
        if (db.users[i].name.localeCompare(n)==0){
            New = false;
        }
    }

    if (New){
        let length = (db.users.length)+1
        const newUser = { id: length, name:n };
        db.users.push(newUser);
        writeDatabase(db);
        user=length;
        
        res.status(200)
    }
    else {
        res.status(401);
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
