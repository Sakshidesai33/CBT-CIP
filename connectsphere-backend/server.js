const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());

// Define a route for root ("/")
app.get('/', (req, res) => {
    res.send('Hello from ConnectSphere Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
