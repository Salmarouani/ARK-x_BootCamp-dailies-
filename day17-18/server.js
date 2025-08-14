import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname for es modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Log file path
const logFilePath = path.join(__dirname, 'server.log');

//Create app & config

const app = express();
const port = process.env.PORT || 3000; 

let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];


// Logging middleware
app.use((req, res, next) => {
  const now = new Date().toISOString();
  const logMessage = `[${now}] ${req.method} ${req.originalUrl}\n`;
  console.log(logMessage.trim());

  //Persist to file (append, non-blocking)

  fs.appendFile(logFilePath, logMessage, (err) => {
    if(err) console.error(`[${now}] Failed to write log: ${err.message}`);
  });

  next();
});

app.use(express.json()); // Needed for JSON body parsing 




app.get('/products/search', (req, res) => {
  let foundProducts = products;
  const q = req.query.q;
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  console.log(`Search Query: ${q}, Min Price: ${minPrice}, Max Price: ${maxPrice}`);

  if (q) {
    foundProducts = foundProducts.filter(product =>
      product.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (!isNaN(minPrice)) {
    foundProducts = foundProducts.filter(product =>
      product.price >= minPrice
    );
  }

  if (!isNaN(maxPrice)) {
    foundProducts = foundProducts.filter(product =>
      product.price <= maxPrice
    );
  }

  if (foundProducts.length > 0) {
    res.status(200).send(foundProducts);
  } else {
    res.status(404).send({ message: "No products within this criteria" });
  }
});

app.get('/products', (req, res) => {
  res.status(200).send(products);
});

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const foundProduct = products.find(product => product.id === id);
  if (foundProduct) {
    res.send(foundProduct);
  } else {
    res.status(404).send("Product not found");
  }
});



app.post('/products', (req, res) => {
    const { name, price } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || !price || isNaN(price) || price <= 0) {
        return res.status(400).send({ message: "Invalid product data" });
    }

    // Generate new ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        name: name.trim(),
        price: parseFloat(price)
    };

    products.push(newProduct);

    res.status(201).send(newProduct);
});

app.use(express.json()); // enable JSON body parsing

app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    // Find product index
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        return res.status(404).send({ message: "Product not found" });
    }

    // Update only the provided fields
    if (name) products[index].name = name;
    if (price) products[index].price = price;

    res.status(200).send({ message: "Product updated successfully", product: products[index] });
});

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id ===id);
    if(index !== -1){
        products.splice(index, 1);
        res.status(200).send("product deleted successfully");
    }else{
        res.status(404).send("product not found");
    }
});


//test route to force an error

app.get('/cause-error', (req, res, next) => {
  next(new Error('Intentional test error'));
})

// middleware to handle non-existent routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
})



// Error handling middleware

app.use((err, req, res, next) => {
  const now = new Date().toISOString();
  const status = err.status || 500;

  const errorLog = `[${now}] ${req.method} ${req.originalUrl} -> ${status} ${err.message}\n`;
  console.error(errorLog.trim());
//log error to file 

fs.appendFile(logFilePath, errorLog, (fileErr) => {
  if (fileErr) console.error(`[${now}] Failed to write error log: ${fileErr.message}`);
});

//friendly response to the client
res.status(status).json({
  message: 'Something went wrong, please try again later.',
  ...(process.env.NODE_ENV === 'development' && { error: err.message}) 
});


});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
