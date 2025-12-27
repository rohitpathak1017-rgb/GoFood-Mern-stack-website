const express = require('express');
const app = express();

const port = 5000;
const connectDB = require('./db');

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// ✅ BODY PARSER MUST COME BEFORE ROUTES
app.use(express.json());

// OPTIONS
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// DB
connectDB();

// Routes (NOW SAFE)
app.use('/api', require('./routes/OrderData'));
app.use('/api/auth', require('./routes/OrderData'));
app.use('/api', require('./routes/Createuser'));
app.use('/api', require('./routes/DisplayData'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



  

  