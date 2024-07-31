import express from 'express';
import customerRouter from './express_server.js'; // Assuming this file is named customerController.js

const app = express();
const port = 3000; // Define the port number here

app.use(express.json()); // Middleware to parse JSON bodies

// Use the customer router
app.use('/api', customerRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});