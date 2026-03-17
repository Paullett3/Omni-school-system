const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Dummy data until you add real MongoDB
let students = [
  { _id: 1, name: "John Doe", grade: "10", parent: "Jane Doe" },
  { _id: 2, name: "Alice Smith", grade: "11", parent: "Bob Smith" }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});