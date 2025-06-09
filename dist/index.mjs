// src/index.ts
import express from 'express';
var app = express();
var port = process.env.PORT || 3e3;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
