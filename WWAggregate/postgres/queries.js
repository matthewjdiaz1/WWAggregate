// TODO, remove config from queries to hide from version control(password)
///////////////////////////////////////////////////
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'carforce',
  host: 'localhost',
  database: 'wwaggregate',
  password: '',
  port: 5432,
});
///////////////////////////////////////////////////

// GET all products
const getProducts = (request, response) => {
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    console.log('getProducts');
    response.status(200).json(results.rows);
  });
};

// GET single product by barcode
// /products/barcodes/:barcode
const getProductByBarcode = (request, response) => {
  const barcode = request.params.barcode;
  console.log('GET req for barcode:', barcode);

  pool.query('SELECT * FROM products WHERE barcode = $1', [barcode], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// POST new product
const createProduct = (request, response) => {
  const { barcode, name, nutritionlabel } = request.body;

  pool.query('INSERT INTO products (barcode, name, nutritionlabel) VALUES ($1, $2, $3)', [barcode, name, nutritionlabel], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Product added with ID: ${result.insertId}`);
  })
};


// PUT updated data in an existing product
// TODO
const updateProduct = (request, response) => {
  // const id = parseInt(request.params.id);
  // const { name, email } = request.body;

  // pool.query(
  //   'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  //   [name, email, id],
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     response.status(200).send(`User modified with ID: ${id}`);
  //   }
  // )
  console.log('updateProduct TODO');
};

// DELETE producs
const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Product deleted with ID: ${id}`)
  })
}

module.exports = {
  getProducts,
  getProductByBarcode,
  createProduct,
  updateProduct,
  deleteProduct,
}
