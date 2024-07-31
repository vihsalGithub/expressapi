import express from 'express';
import { ObjectId } from 'mongodb';
import { createCustomer, getCustomer, updateCustomer, deleteCustomer, listCustomers,getCustomerByCusId  } from './customerCrud.js';

const router = express.Router();

// Create a new customer
router.post('/customers', async (req, res) => {
  try {
    const customer = req.body;
    // Basic validation (you can add more validation as needed)
    if (!customer.name || !customer.address) {
      return res.status(400).json({ error: 'Name and address are required' });
    }
    const newCustomer = await createCustomer(customer);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/customers/cusid/:cusid', async (req, res) => {
  try {
    const cusid = req.params.cusid;
    const customer = await getCustomerByCusId(cusid);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get a customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid customer ID get' });
    }
    const customer = await getCustomer(id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a customer by ID
router.put('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid customer ID put' });
    }
    // Basic validation for update
    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: 'No update fields provided' });
    }
    const updated = await updateCustomer(id, updates);
    if (updated) {
      res.json({ message: 'Customer updated successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a customer by ID
router.delete('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid customer ID delete' });
    }
    const deleted = await deleteCustomer(id);
    if (deleted) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await listCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;