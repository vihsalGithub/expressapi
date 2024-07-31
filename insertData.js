import { createCustomer } from './customerCrud.js';
//import { createCustomer, getCustomer, updateCustomer, deleteCustomer, listCustomers } from './customerService.js';
console.log(createCustomer);

try {
    const customer = await createCustomer({ name: "Company Inc2", address: "Highway 37" ,address3: "Highway 37" });
    console.log(customer);
} catch (err) {
     // console.log(err);  
}