// server.js
import http from 'http';
import { URL } from 'url';
import { createCustomer, getCustomer, updateCustomer, deleteCustomer, listCustomers } from './customerCrud.js';
import { parse } from 'querystring';
import { ObjectId } from 'mongodb';

const port = 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  // Parse JSON body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // Convert Buffer to string
  });
  req.on('end', async () => {
    try {
      if (body) {
        try {
          req.body = JSON.parse(body);
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
          return;
        }
      } else {
        req.body = {};
      }

      if (method === 'POST' && path === '/customers') {
        const customer = req.body;
        if (!customer.name || !customer.address) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name and address are required' }));
          return;
        }
        const newCustomer = await createCustomer(customer);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newCustomer));
      } else if (method === 'GET' && path.startsWith('/customers/')) {
        const id = path.split('/')[2];
        if (!ObjectId.isValid(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid customer ID' }));
          return;
        }
        const customer = await getCustomer(id);
        if (customer) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(customer));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Customer not found' }));
        }
      } else if (method === 'PUT' && path.startsWith('/customers/')) {
        const id = path.split('/')[2];
        if (!ObjectId.isValid(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid customer ID' }));
          return;
        }
        const updated = await updateCustomer(id, req.body);
        if (updated) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Customer updated successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Customer not found' }));
        }
      } else if (method === 'DELETE' && path.startsWith('/customers/')) {
        const id = path.split('/')[2];
        if (!ObjectId.isValid(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid customer ID' }));
          return;
        }
        const deleted = await deleteCustomer(id);
        if (deleted) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Customer deleted successfully' }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Customer not found' }));
        }
      } else if (method === 'GET' && path === '/customers') {
        const customers = await listCustomers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(customers));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
